import { useNavigate } from "react-router-dom";

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="btn px-12  btn-neutral rounded-full my-4"
      >
        Go Back{" "}
      </button>
    </div>
  );
};

export default GoBack;
