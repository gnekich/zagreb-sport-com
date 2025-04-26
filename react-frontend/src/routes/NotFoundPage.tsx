import React from "react";

import { useTranslation } from "react-i18next";
import { useLocation, useParams, useNavigate } from "react-router-dom";

function NotFoundPage() {
  return (
    <React.Fragment>
      <div className="h-full w-screen flex items-center justify-center">
        <div className="grid h-full w-full items-center justify-center">
          <div className="h-full w-full flex flex-col items-center justify-center text-center">
            <h1>NOT FOUND 404</h1>

            <h1>Misc</h1>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NotFoundPage;
