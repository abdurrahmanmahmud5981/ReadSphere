import { FaArrowLeft } from "react-icons/fa6";
import notFoundImg from "../../assets/pageNotFound.svg";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="shadow px-10 w-full lg:flex-row gap-8 lg:gap-0 flex-col flex items-center justify-evenly py-20 rounded-xl">
      <div className="w-10/12 lg:w-5/12">
        <img
          src={notFoundImg}
          alt="illustration"
          className="w-full"
        />
      </div>

      <div className="w-full lg:w-1/3 text-center lg:text-start">
        <h1 className="text-2xl sm:text-6xl font-bold  leading-10">
          OOPS!
        </h1>

        <h3 className=" text-sm sm:text-xl mt-3">
          Looks like big foot has broken the link
        </h3>

        <button onClick={()=>navigate("/")} className=" btn  bg-neutral text-white px-8  mt-8 hover:text-black">
          {" "}
          <FaArrowLeft /> Back to homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;