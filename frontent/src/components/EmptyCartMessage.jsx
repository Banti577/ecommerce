import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const EmptyCartMessage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="bg-red-500 hover:bg-red-700 text-white border p-2  mt-10 ml-30 cursor-pointer flex items-center space-x-5"
        type="button"
      >
        <IoIosArrowRoundBack /> Back
      </button>

      <div className=" w-full p-2 flex flex-col justify-center items-center">
        <div className="m-auto ">
          <img src="../image/empty-bag.webp" alt="" />
          <h2>There is nothing in your bag. Let's add some items.</h2>

          <button
            onClick={() => {
              navigate("/");
            }}
            className="text-pink-500 border p-2 w-full m-auto mt-4 cursor-pointer"
            type="button"
          >
            Add Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCartMessage;
