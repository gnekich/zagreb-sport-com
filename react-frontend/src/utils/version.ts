const generateVersionString = () => {
  const appVersion = import.meta.env.VITE_APP_VERSION ?? "v0.0.0";
  const branchName = import.meta.env.VITE_GIT_BRANCH_NAME;
  // Get first 8 characters of commit hash
  const commitHash =
    `${import.meta.env.VITE_GIT_COMMIT_HASH ?? ""}`.slice(0, 8) ?? "00000000";

  const commitDate = `${import.meta.env.VITE_GIT_COMMIT_DATE}`.split("T")[0];
  const buildNumber = Math.floor(
    ((new Date().getTime() / 1000) % (3600 * 24)) / (60 * 7)
  ); // 7 minutes modulo in a day

  if (
    branchName === "main" ||
    branchName === "master" ||
    branchName === "production" ||
    branchName === "prod"
  ) {
    return `${appVersion}-${commitHash}-${buildNumber}`;
  }

  if (branchName === "development" || branchName === "dev") {
    return `${appVersion}-${branchName}-${commitHash}-${commitDate}`;
  }

  return `${appVersion}-hotbuild`;
};

export const versionString = generateVersionString();

export default versionString;
