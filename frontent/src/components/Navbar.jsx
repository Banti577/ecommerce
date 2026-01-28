import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";

import { LuSearch } from "react-icons/lu";

import { useTheme } from "../contexts/ThemeContext";
import axios from "axios";


const Navbar = ({ setShowSearch }) => {
  // const searchNavInputClear = useSelector((s) => s.Movies.searchNavInputClear);
  const { theme, setTheme } = useTheme();
   const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((store) => store.Auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bagItems = useSelector((state) => state.Cart);

  console.log("bag item from navbar", bagItems.items);

  const [query, setQuery] = useState("");
  
    const handleToggle = () => {
    if (!user) {
      navigate("/auth");
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleLogout = async() =>{
    try{
console.log('logout started');
   
const responts =  await axios.get(`${import.meta.env.VITE_BACKEND_URL}` + "/auth/logout",{
       withCredentials: true 
})
console.log(responts);
 }catch(err){
console.log(err);
 }

  }

  return (
    <div
      className={`${
        theme &&
        ` ${theme.curr_BG} ${theme.curr_TEXT} shadow-sm transition-all duration-500 ease-in-out`
      }`}
    >
      <nav className="flex justify-around items-center">
        <div className="list-none">
          <li className="text-3xl ">
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer p-4 text-2xl font-bold text-red-500"
            >
              Shop
              <span
                className={`${
                  theme === "light"
                    ? "text-[#4A69FF] transition-all duration-500"
                    : "text-white transition-all duration-500"
                }`}
              >
                Spot
              </span>
            </div>
          </li>
        </div>

        <div className="flex items-center list-none w-[70%] ">
          <li className="relative mx-3 group w-full ">
            <input
              value={query}
              onChange={(e) => handleSearch(e)}
              type="search"
              placeholder="Search Movie..."
              className={`${
                theme &&
                ` ${theme.curr_BG} ${theme.curr_TEXT}   w-full min-w-62.5 py-2 pl-10 pr-4 rounded-lg border transition-all duration-200  focus:ring-2 focus:ring-[#578FCA] focus:border-[#578FCA] outline-none`
              }`}
            />
            <div
              className={`
               absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
               ${theme === "light" ? "text-gray-400" : "text-gray-300"}
                `}
            >
              <LuSearch className="w-5 h-5" />
            </div>
          </li>

          <li
            onClick={() => {
              setTheme((c) => (c === "dark" ? "light" : "dark"));
            }}
            className={`mx-3 cursor-pointer transition-all duration-200 `}
          >
            {theme.themeName === "dark" ? (
              <MdOutlineLightMode />
            ) : (
              <MdDarkMode />
            )}
          </li>

          <div className="w-[70%] flex items-center justify-center ">
            <li className="relative mx-3 cursor-pointer group">
          
              <div
                onClick={handleToggle}
                className={`${theme.curr_TEXT} flex items-center gap-1`}
              >
                {user ? user.fullName : "Login"}
                {user && <span className="text-xs">▼</span>}
              </div>

              {/* Dropdown Menu */}
              {user && isOpen && (
                <ul className="absolute top-8 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-black">
                  <li
                    onClick={() => {
                      navigate("/profile");
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </li>
                  <li
                    onClick={() => {
                  navigate('/myorders')
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Orders
                  </li>
                  <li
                    onClick={() => {
                    handleLogout();
                    }}
                    className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer border-t"
                  >
                    Logout
                  </li>
                </ul>
              )}
            </li>
            <li
              onClick={() => navigate("/checkout/cart")}
              className={`mx-3 cursor-pointer relative ${theme.curr_TEXT}`}
            >
              <FaCartShopping size={24} />

              {bagItems.items && bagItems.items.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {bagItems.items.length}
                </div>
              )}
            </li>

            <li
              onClick={() => {
                //   dispatch(logout());
              }}
              className={`mx-3 cursor-pointer ${theme.curr_TEXT}`}
            >
              {/*user && "logout"*/}
              <li className="mx-2.5">Become a sheller</li>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
