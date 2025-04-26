import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "@/routes/RootPage";
import AboutPage from "@/routes/AboutPage";
import VerifyEmailPage from "@/routes/VerifyEmailPage";
import ForgotPasswordPage from "@/routes/ForgotPasswordPage";
import MembershipPage from "@/routes/MembershipPage";
import DashboardPage from "@/routes/DashbaordPage";
import ProfileSettingsPage from "@/routes/ProfileSettingsPage";
import LogoutPage from "@/routes/LogoutPage";
import TermsOfServicePage from "@/routes/TermsOfServicePage";
import TeamPage from "@/routes/TeamPage";
import SignInPage from "@/routes/SignInPage";
import SignUpPage from "@/routes/SignUpPage";
import NajavaPage from "@/routes/NajavaPage";
import DokumentiSavezaPage from "@/routes/DokumentiSavezaPage";
import UnesiNatjecateljePage from "@/routes/UnesiNatjecateljePage";
import UnesiNatjecanjaPage from "@/routes/UnesiNatjecanjaPage";

import ErrorPage from "@/routes/ErrorPage";
import NotFoundPage from "@/routes/NotFoundPage";
import LoadingSuspenseComponent from "@/components/Suspense/LoadingSuspenseComponentSimple";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmailPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/password-reset",
    element: <ForgotPasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/membership",
    element: <MembershipPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
    errorElement: <ErrorPage />,
  },

  // SignUp
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  // SignIn
  {
    path: "/signin",
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },
  // Reset password
  {
    path: "/reset-password",
    element: <ForgotPasswordPage />,
    errorElement: <ErrorPage />,
  },

  // Dashboard page
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings/profile",
    element: <ProfileSettingsPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/unesi-najavu",
    element: <NajavaPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/unesi-natjecatelje",
    element: <UnesiNatjecateljePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/preuzmi-dokumente-saveza",
    element: <DokumentiSavezaPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/unesi-natjecanja",
    element: <UnesiNatjecanjaPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/unesi-dokumente-rezultata",
    element: <ProfileSettingsPage />,
    errorElement: <ErrorPage />,
  },

  // Nice
  {
    path: "Team",
    element: <TeamPage />,
    errorElement: <ErrorPage />,
  },

  // Legal
  {
    path: "terms-and-privacy",
    element: <TermsOfServicePage />,
    errorElement: <ErrorPage />,
  },

  // Debug
  {
    path: "debug/404",
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "debug/loading",
    element: <LoadingSuspenseComponent />,
    errorElement: <ErrorPage />,
  },
]);

function BrowserRouter() {
  return (
    <RouterProvider
      //fallbackElement={NotFound}
      router={router}
    />
  );
}

export default BrowserRouter;
