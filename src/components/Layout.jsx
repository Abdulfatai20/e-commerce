import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import {ToastContainer} from 'react-toastify';

const Layout = () => {
  return (
    <>
    <ToastContainer/>
      <Navbar />
      <SearchBar/>
      <Outlet />
      <Footer/>
    </>
  );
};

export default Layout;
