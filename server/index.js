import dotenv from "dotenv";
import express from 'express';
import cors from 'cors'; 
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'; 
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser"; 

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000; // Define the port for the server

// CORS configuration to allow specific origins and handle credentials
const corsOptions = {
    origin: ['http://localhost:5173', 'https://library-management-system-bd.web.app', 'http://localhost:4173'],
    credentials: true,
    optionsSuccessStatus: 200,
};

// Middleware configuration
app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies in the request

// MongoDB connection string
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fxybk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies?.token; // Retrieve token from cookies
    if (!token) return res.status(401).send({ message: "unauthorized access" });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send({ message: "unauthorized access" });
        req.user = decoded; // Attach decoded token data to the request object
        next(); // Proceed to the next middleware
    });
};

// Main function to connect to MongoDB and define API routes
async function run() {
    try {
        const libraryDB = client.db("libraryDB"); // Database instance

        // Collections
        const books = libraryDB.collection("books");
        const borrowedBooks = libraryDB.collection("borrowedBooks");

        // Endpoint to generate a JWT token
        app.post('/jwt', async (req, res) => {
            const email = req.body;
            const token = jwt.sign(email, process.env.SECRET_KEY, { expiresIn: '365d' });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
            }).send({ success: true });
        });

        // Endpoint to clear the JWT token (logout)
        app.post('/logout', async (req, res) => {
            res.clearCookie("token", {
                maxAge: 0,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
            }).send({ success: true });
        });

        // Books collection APIs

        // Retrieve all books
        app.get('/books', async (req, res) => {
            const cursor = books.find({});
            const result = await cursor.toArray();
            res.json(result);
        });

        // Retrieve books by category
        app.get('/books/categories/:category', async (req, res) => {
            const result = await books.find({ bookCategory: req.params.category }).toArray();
            res.json(result);
        });

        // Retrieve a single book by ID
        app.get('/books/book/:id', async (req, res) => {
            const result = await books.findOne({ _id: new ObjectId(req.params.id) });
            res.json(result);
        });

        // Add a new book (requires token verification)
        app.post('/books/add', verifyToken, async (req, res) => {
            const newBook = req.body;
            const result = await books.insertOne(newBook);
            res.json(result);
        });

        // Update a book by ID (requires token verification)
        app.put('/books/update/:id', verifyToken, async (req, res) => {
            const updatedBook = req.body;
            const result = await books.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: updatedBook }
            );
            res.json(result);
        });

        // Borrowed Books collection APIs

        // Retrieve borrowed books for a specific user
        app.get('/borrowed-books/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const decodedEmail = req.user?.email;
            if (decodedEmail !== email) return res.status(401).send({ message: "unauthorized access" });
            const result = await borrowedBooks.find({ userEmail: email }).toArray();
            res.json(result);
        });

        // Borrow a book (requires token verification)
        app.post('/books/borrow', verifyToken, async (req, res) => {
            const borrowedBook = req.body;

            // Check if the book is already borrowed
            const existingBorrowedBook = await borrowedBooks.findOne({ userEmail: borrowedBook.userEmail, bookId: borrowedBook.bookId });

            if (!existingBorrowedBook) {
                const result = await borrowedBooks.insertOne(borrowedBook);

                // Update book quantity in the books collection
                await books.findOneAndUpdate(
                    { _id: new ObjectId(borrowedBook.bookId) },
                    { $inc: { quantity: -1 } }
                );

                res.json(result);
            } else {
                return res.status(400).send({ message: 'Book is already borrowed' });
            }
        });

        // Return a borrowed book (requires token verification)
        app.delete('/borrowed-books/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const bookId = req.query?.bookId;

            // Remove the borrowed book record
            const result = await borrowedBooks.deleteOne({ _id: new ObjectId(id) });

            // Update book quantity in the books collection
            await books.findOneAndUpdate(
                { _id: new ObjectId(bookId) },
                { $inc: { quantity: 1 } }
            );

            res.json(result);
        });

   
    } catch (err) {
        console.error(err);
    }
}

// Initialize the server
run().catch(console.dir);

// Base endpoint for server status
app.get('/', (req, res) => {
    res.send('Library Management System Server is running');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
