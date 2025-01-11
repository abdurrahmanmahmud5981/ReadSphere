import {
  FaBook,
  FaUsers,
  FaBookReader,
  FaClipboardCheck,
} from "react-icons/fa";
const Statistics = () => {
  return (
    <div>
      <section className="py-16 bg-cover bg-center">
        <div className="mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Library Impact
          </h2>
          <div className="grid grid-cols-2  lg:grid-cols-4 shadow w-full rounded-lg">
            <div className="stat place-items-center border-b lg:border-b-transparent border-r border-gray-300 px-0">
              <FaBook className="text-6xl mb-4" />
              <div className="stat-title">Books Available</div>
              <div className="stat-value">10K+</div>
              <div className="stat-desc">January 1st to February 1st</div>
            </div>

            <div className="stat place-items-center border-b lg:border-b-transparent lg:border-r border-gray-300 px-0">
              <FaUsers className="text-6xl mb-4 text-primary" />
              <div className="stat-title">Active Readers</div>
              <div className="stat-value text-primary">4,200</div>
              <div className="stat-desc text-primary">↗︎ 400 (22%)</div>
            </div>

            <div className="stat place-items-center  border-r border-gray-300 px-0">
              <FaBookReader className="text-6xl mb-4" />
              <div className="stat-title">Books Borrowed</div>
              <div className="stat-value">1,200</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>

            <div className="stat place-items-center px-0">
              <FaClipboardCheck className="text-6xl mb-4 text-purple-600" />
              <div className="stat-title">Books Returned</div>
              <div className="stat-value text-purple-600">900</div>
              <div className="stat-desc text-purple-600">↗︎ 150 (20%)</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Statistics;
