import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import useAuth from "../hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, setCartItems } = useContext(ShopContext);
  const { accessToken } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const axiosPrivate = useAxiosPrivate();

  const verifyPayment = async () => {
    if (!accessToken) {
      return null;
    }
    try {
      const response = await axiosPrivate.post("/api/order/verifypayStack", {
        reference,
      });
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
        toast.success(response.data.message);
      } else {
        navigate("/cart");
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [accessToken]);

  return <div></div>;
};

export default Verify;
