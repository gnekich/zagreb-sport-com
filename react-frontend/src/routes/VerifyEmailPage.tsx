import React from "react";
// import { useTranslation } from "react-i18next";

import NavigationHeader from "@/components/NavigationHeader";
import FirebaseVerifyEmailAddress from "@/components/FirebaseVerifyEmailAddress";

function Page() {
  return (
    <>
      <NavigationHeader />
      <FirebaseVerifyEmailAddress />
    </>
  );
}

export default Page;
