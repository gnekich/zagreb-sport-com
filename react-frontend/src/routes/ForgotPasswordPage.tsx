import React from "react";
// import { useTranslation } from "react-i18next";

import NavigationHeader from "@/components/NavigationHeader";
import FirebasePasswordReset from "@/components/FirebasePasswordReset";

function Page() {
  return (
    <>
      <NavigationHeader />
      <FirebasePasswordReset />
    </>
  );
}

export default Page;
