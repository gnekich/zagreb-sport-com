// Used for suspense
import React from "react";

// // Language support
// import "./i18n";

// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import WebAppTitleEffect from "@/components/WebAppTitle/WebAppTitleEffect";

// Routes and route suspense
import LoadingSuspenseComponent from "@/components/Suspense/LoadingSuspenseComponentSimple";
import BrowserRouter from "@/routes/BrowserRouter";

// Appolo client and provider
import { ApolloProvider } from "@apollo/client";
import { client } from "@/utils/ApolloProvider";

// MUI Theme and CssBaseline
import ThemeProviderWithTheTheme from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <React.Suspense fallback={<LoadingSuspenseComponent />}>
          {/* <ThemeProvider theme={theme}> */}
          <ThemeProviderWithTheTheme>
            <CssBaseline />
            <WebAppTitleEffect />
            <BrowserRouter />
            {/* <div className="flex flex-col items-center justify-start h-screen">
              <main
                className="flex flex-col items-center justify-start flex-1"
                style={{ height: "calc(100vh - 56px)" }}
              >
                
              </main>
            </div> */}
          </ThemeProviderWithTheTheme>
          {/* </ThemeProvider> */}
        </React.Suspense>
        <ToastContainer stacked={false} limit={1} />
      </ApolloProvider>
    </>
  );
}

export default App;
