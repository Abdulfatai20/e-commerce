import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const { accessToken, isLoading, setIsLoading } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    if (!accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${accessToken}`);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
