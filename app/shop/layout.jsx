import React from "react";
import Header from "@/public/components/header/Header";
import Footer from "@/public/components/footer";

const PageLayout = ({ children }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
