import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { logout } from "../../features/cart/authSlice";



export const handleLogout = async (dispatch) => {

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}` + "/auth/logout",
      {
        withCredentials: true,
      },
    );
    if (response.status == 200) {
      dispatch(logout());
      toast.success(response.data.message)
    }
  } catch (err) {
    console.log(err);
  }
};


