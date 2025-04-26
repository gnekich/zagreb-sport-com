import React from "react";

import NavigationHeader from "@/components/NavigationHeader";
import Footer from "../components/Footer";

import { versionString } from "@/utils/version";

export default function AboutPage() {
  return (
    <React.Fragment>
      <NavigationHeader />

      <div className="flex flex-col items-center justify-start min-h-screen ">
        <div className="bg-white m-10 p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">About Us</h1>
          <p className="text-lg text-gray-700 mb-6">Welcome ...</p>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Links</h2>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Misc</h2>
            <p className="text-gray-700">Version: {versionString}</p>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
