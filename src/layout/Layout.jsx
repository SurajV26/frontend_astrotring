import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Disclaimer from "@/components/Disclaimer";
import WhatsAppButton from "@/components/WhatsAppButton";
import React from "react";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>

      <Header />
      <main >
        <Outlet />
      </main>
      <Footer />
      <Disclaimer />
      <WhatsAppButton />
    
    </>
  );
};

export default Layout;
