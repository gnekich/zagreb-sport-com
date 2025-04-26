import React from "react";
import { useTranslation } from "react-i18next";

import NavigationHeader from "@/components/NavigationHeader";
import MembershipCard from "@/components/MembershipCard";

function Page() {
  const { t } = useTranslation();

  return (
    <>
      <NavigationHeader />
      <MembershipCard />
    </>
  );
}

export default Page;
