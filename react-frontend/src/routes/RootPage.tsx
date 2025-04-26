import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import NavigationHeader from "@/components/NavigationHeader";

import Home from "@/components/Home/index";

function Page() {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate("/login");
  };

  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <>
      <NavigationHeader />
      <Home />
    </>
  );
}

export default Page;
