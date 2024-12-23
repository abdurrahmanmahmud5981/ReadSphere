import React from "react";

const Features = () => {
  return (
    <div>
      <section className="py-16">
        <div className=" mx-auto ">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-gradient-to-br from-purple-200/60 via-white/30 to-purple-400/40 bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary p-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="card-title">Easy Access</h3>
                <p>Browse and borrow books with just a few clicks</p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-purple-200/60 via-white/30 to-purple-400/40 bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary p-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="card-title">Quick Service</h3>
                <p>Fast processing of borrowing requests</p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-purple-200/60 via-white/30 to-purple-400/40 bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary p-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="card-title">Secure System</h3>
                <p>Safe and secure book management</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
