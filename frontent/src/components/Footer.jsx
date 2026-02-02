import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer
      className={`${theme && `${theme.curr_BG} ${theme.curr_TEXT} transition-all duration-300 py-6 mt-5`} `}
    >
      <div className="container mx-auto px-4 text-center">
        <div
          className={` ${theme.curr_BG} ${theme.curr_TEXT} transition-all duration-300 flex justify-center space-x-6 mb-4 `}
        >
          <li className="list-none cursor-pointer">Home</li>
          <li className="list-none cursor-pointer">About</li>
          <li className="list-none cursor-pointer">Shop</li>
          <li className="list-none cursor-pointer">Contact</li>
        </div>

        <div
          className={` ${theme.curr_BG} ${theme.curr_TEXT} transition-all duration-300 flex justify-center space-x-4 mb-4`}
        >
          <FaFacebook className="cursor-pointer" />
          <FaInstagram className="cursor-pointer" />
          <BsTwitterX className="cursor-pointer" />
        </div>

        <p className="text-sm text-gray-400">
          @2026 E-Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
