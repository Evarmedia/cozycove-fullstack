
const logout = async (navigate) => {
  try {
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    if (tokenExpiry && Date.now() > tokenExpiry) {
      console.log("Token has expired, logging out");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");
    localStorage.removeItem("name");
    localStorage.removeItem("tokenExpiry");
    
    navigate("/");
    
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export default logout;
