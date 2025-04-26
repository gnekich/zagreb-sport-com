import React from "react";
import { useTranslation } from "react-i18next";

import NavigationHeader from "@/components/NavigationHeader";

function Page() {
  const { t } = useTranslation();

  const [count, setCount] = React.useState(0);

  return (
    <>
      <h1>Test internal React store!</h1>
      <NavigationHeader />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Value of {import.meta.env.VITE_PUBLIC_PAGE_TITLE}</p>
        <button onClick={() => setCount(() => 0)}>Reset</button>
      </div>
    </>
  );
}

export default Page;
