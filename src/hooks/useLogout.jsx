import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAccessToken } = useAuth();

  const logout = async () => {
    localStorage.removeItem("persist");
    setAccessToken(null);
    try {
      const response = await axios.post(
        "/api/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};

export default useLogout;
