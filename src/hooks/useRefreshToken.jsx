import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();
  const refresh = async () => {
    try {
      const response = await axios.get("/api/user/refresh", {
        withCredentials: true,
      });
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      setAccessToken(null);
      navigate("/login");
      throw error;
    }
  };
  return refresh;
};

export default useRefreshToken;
