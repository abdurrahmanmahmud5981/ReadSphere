
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-content/50   py-10">
      <div className="max-w-screen-2xl  w-11/12 mx-auto  grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo and Description */}
        <div>
          <h1 className="text-3xl font-bold mb-3">ReadSphere</h1>
          <p className="mb-4">
            Your ultimate library companion for exploring, borrowing, and
            managing books with ease. Stay connected, stay informed!
          </p>
          <div className="flex space-x-4">
            <FaFacebook className="text-xl cursor-pointer hover:text-primary" />
            <FaTwitter className="text-xl cursor-pointer hover:text-primary" />
            <FaInstagram className="text-xl cursor-pointer hover:text-primary" />
            <FaLinkedin className="text-xl cursor-pointer hover:text-primary" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="hover:text-primary transition duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary transition duration-200"
              >
                All Books
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary transition duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary transition duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Stay Updated</h2>
          <p className="mb-4">
            Subscribe to our newsletter to get the latest updates on new books
            and features.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full max-w-xs rounded-l-md"
            />
            <button className="btn btn-neutral ml-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="text-center mt-10 border-t border-neutral-content/50 pt-5">
        <p className="text-sm">
          © {new Date().getFullYear()} ReadSphere. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
