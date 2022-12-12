export const checkAuth = () => {
  if (
    typeof window.localStorage !== "undefined" &&
    localStorage.getItem("leave-management")
  )
    return true;
  else return false;
};

export const setAuth = (data: any) => {
  if (typeof window.localStorage !== "undefined") {
    localStorage.setItem("leave-management", JSON.stringify(data));
  }
};

export const clearAuth = () => {
  if (typeof window.localStorage !== "undefined") {
    localStorage.removeItem("leave-management");
  }
};

export const getAuth = () => {
  if (typeof window.localStorage !== "undefined") {
    return JSON.parse(localStorage.getItem("leave-management")!);
  }
};

export const getAuthRefreshToken = () => {
  if (typeof window.localStorage !== "undefined") {
    const userObj = JSON.parse(localStorage.getItem("leave-management")!);
    return userObj?.refreshToken;
  }
};

export const updateAuthToken = (token: string) => {
  if (typeof window.localStorage !== "undefined") {
    const userObj = JSON.parse(localStorage.getItem("leave-management")!);
    userObj.token = token;
    localStorage.setItem("leave-management", JSON.stringify(userObj));
  }
};
