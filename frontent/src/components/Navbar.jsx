import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { useTheme } from "../contexts/ThemeContext";
import { useDebounce } from "./useDebounce";
import { handleLogout } from "./utils/logoutHelpers";
import { handleBecomeSeller } from "./utils/becomeSellerHelper";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.Auth.user);
  const bagItems = useSelector((state) => state.Cart);

  const { theme, setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  const debounceRes = useDebounce(query, 600);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setShowResults(false);
      setResults([]);
      return;
    }

    setShowResults(true);
  };

  useEffect(() => {
    if (!debounceRes.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const Search = async () => {
      try {
        setIsSearching(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/search?searchTerm=${debounceRes}`,
        );
        setResults(res.data);
      } catch (error) {
        console.log("search error", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    Search();
  }, [debounceRes]);

  useEffect(() => {
    const close = () => setShowResults(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleToggle = () => {
    if (!user) navigate("/auth");
    else setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${theme && `${theme.curr_BG} ${theme.curr_TEXT} z-1000 transition-all duration-500 ease-in-out sticky top-0`}`}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <div className="">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer text-2xl  flex items-center gap-1"
          >
            <span className="text-red-500"> Byte</span>
            <span>Bazaar</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-6 w-full ml-10">
          <div className="relative grow max-w-xl group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LuSearch className="w-5 h-5" />
            </div>

            <input
              value={query}
              onChange={handleSearch}
              type="search"
              placeholder="Search for products..."
              className={`${theme.curr_BG} ${theme.curr_TEXT} w-full py-2.5 pl-10 pr-4 rounded-xl border focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300`}
            />

            {(showResults || isSearching) && (
              <ul
                className={`absolute top-full left-0 mt-2 w-full rounded-xl shadow-2xl border ${theme.curr_BG} ${theme.curr_TEXT} z-50 overflow-hidden`}
              >
                {isSearching ? (
                  <li className="px-5 py-3 text-sm opacity-70">Searching...</li>
                ) : results.length > 0 ? (
                  results.map((item) => (
                    <li
                      key={item._id}
                      onClick={() => {
                        navigate(`/products/${item._id}`);
                        setShowResults(false);
                        setQuery("");
                      }}
                      className="px-5 py-3 hover:bg-blue-300 dark:hover:bg-blue-600 cursor-pointer border-b last:border-b-0"
                    >
                      <span className="font-medium">{item.productName}</span>
                    </li>
                  ))
                ) : (
                  <li className="px-5 py-3 text-sm opacity-70 cursor-default">
                    No products found
                  </li>
                )}
              </ul>
            )}
          </div>

          <div className="flex items-center gap-5">
            <div
              onClick={() => setTheme((c) => (c === "dark" ? "light" : "dark"))}
              className="p-2 cursor-pointer transition-transform active:scale-90"
            >
              {theme.themeName === "dark" ? (
                <MdOutlineLightMode size={22} />
              ) : (
                <MdDarkMode size={22} />
              )}
            </div>

            <div className="relative">
              <div
                onClick={handleToggle}
                onMouseEnter={() => setIsOpen(!isOpen)}
               
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity font-medium"
              >
                {user && (
                  <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white text-xs">
                    {user.fullName.charAt(0)}
                  </div>
                )}
                <span className="hidden md:block">
                  {user ? user.fullName : "Login"}
                </span>
              </div>

              {user && isOpen && (
                <ul className="absolute right-0 top-10 mt-2 w-52 bg-white dark:bg-gray-900 border border-gray-200 rounded-xl shadow-2xl py-2 z-50 text-sm overflow-hidden text-red-700"
                 onMouseLeave={() => setIsOpen(false)}
                >
                  <li
                    onClick={() => navigate("/profile")}
                    className="px-4 py-3 hover:bg-gray-100  cursor-pointer"
                  >
                    Profile
                  </li>
                  <li
                    onClick={() => navigate("/myorders")}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    My Orders
                  </li>
                  <li
                    onClick={() => handleLogout(dispatch, navigate)}
                    className="px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-semibold cursor-pointer border-t"
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>

            <div
              onClick={() => navigate("/checkout/cart")}
              className="relative p-2 cursor-pointer"
            >
              <FaCartShopping size={22} />
              {bagItems.items?.length > 0 && (
                <span className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                  {bagItems.items.length}
                </span>
              )}
            </div>

            <button
              onClick={() => handleBecomeSeller({ user, dispatch, navigate })}
              className="px-4 py-2 rounded-full border text-sm  cursor-pointer"
            >
              {user && user.role === "user" ? "Become a seller" : "Seller Dash"}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
