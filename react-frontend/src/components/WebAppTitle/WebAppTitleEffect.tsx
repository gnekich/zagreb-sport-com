import React from "react";

import useWebAppTitle from "./useWebAppTitle";

export const WebAppTitleEffect = () => {
  const title = useWebAppTitle((state) => state.title);
  // const changeTitle = useWebAppTitle((state) => state.changeTitle);

  React.useEffect(() => {
    // Change website Title
    document.title = title;
  }, [title]);

  return;
};

export default WebAppTitleEffect;
