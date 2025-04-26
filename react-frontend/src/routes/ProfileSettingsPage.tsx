import React from "react";
import { useTranslation } from "react-i18next";

import NavigationHeader from "@/components/NavigationHeader";

function Page() {
  const { t } = useTranslation();

  return (
    <>
      <NavigationHeader />
    </>
  );
}

export default Page;
