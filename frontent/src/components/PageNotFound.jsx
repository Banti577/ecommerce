import pageNotFoundImg from "../assets/404_face.png";

const PageNotFound = () => {
  return (
    <div className="flex md:flex-row flex-col justify-center  items-center overflow-hidden min-h-screen">
      <div>
        <img
          className="w-80 items-center mx-9 "
          src={pageNotFoundImg}
          alt=""
          srcset=""
        />
      </div>
      <div>
        <h1 className="text-2xl">Page Not Found</h1>
        <p>Sorry, but we can't find the page you are looking for...</p>
      </div>
    </div>
  );
};
export default PageNotFound;
