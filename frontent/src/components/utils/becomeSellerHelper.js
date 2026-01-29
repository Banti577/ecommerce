import axios from "axios";
import { updateUser } from "../../features/cart/authSlice";

export const handleBecomeSeller = async ({ user, dispatch, navigate }) => {

  if (!user) {
    navigate("/auth");
    return;
  }
  if (user.role === "seller") {
    navigate("/seller/dashboard");
    return;
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/become-seller`,
      {},
      { withCredentials: true }
    );


    dispatch(updateUser(
   res.data.user,
    ));

    navigate("/seller/dashboard");
  } catch (error) {
    console.log("Become seller error", error);
    alert(
      error?.response?.data?.msg || "Failed to become seller"
    );
  }
};
