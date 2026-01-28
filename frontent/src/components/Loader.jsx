import { LuLoader } from "react-icons/lu";

const Loader = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen ">
        <div className=" p-2 text-amber-400 animate-spin  text-7xl">
          <LuLoader />
        </div>
        <div className="text-2xl">Loading...</div>
      </div>
    </>
  );
};

export default Loader;
