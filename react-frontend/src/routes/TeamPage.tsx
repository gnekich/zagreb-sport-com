import React from "react";
import { Box } from "@mui/material";

import NavigationHeader from "@/components/NavigationHeader";

export default function Page() {
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((prevCounter) => {
  //       if (prevCounter === 2) {
  //         clearInterval(interval); // Clear the interval before throwing the error
  //         throw new Error("Intentional error caused after few sec!");
  //       }
  //       return prevCounter + 1;
  //     });
  //   }, 3000);

  //   return () => clearInterval(interval); // Cleanup interval on component unmount
  // }, []);

  return (
    <React.Fragment>
      <NavigationHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
          backgroundColor: "#f5f5f5", // Optional background color
        }}
      >
        <img
          src="/team.jpg" // Replace with your image path
          alt="Centered Image"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </Box>
    </React.Fragment>
  );
}
