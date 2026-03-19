import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TopLogos from "@/components/TopLogos";
import Disclaimer from "@/components/Disclaimer";
import WhatsAppButton from "@/components/WhatsAppButton";
import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <TopLogos />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Disclaimer />
      <WhatsAppButton />
    </>
  );
};

export default Layout;
