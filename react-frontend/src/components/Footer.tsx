import React from "react";

import { Link } from "react-router-dom";

import { versionString } from "@/utils/version";
import { siteNameString } from "@/utils/siteName";

const Footer = () => (
  <footer className="p-4 flex items-center justify-between w-full bg-gray z-10 relative">
    <p>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
    </p>
    <p className="text-xs">
      {siteNameString} | {versionString}
    </p>
  </footer>
);

export default Footer;
