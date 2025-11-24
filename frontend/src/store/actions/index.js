import api from "../../api/api";

export const loginUser = (loginData, toast, navigate) => async (dispatch) => {
    try {
    const res = await api.post("/users/login", loginData); 
    const data = res.data;

    dispatch({ type: "SIGNIN_USER", payload: data });
    localStorage.setItem("authentication", JSON.stringify(data));

    toast.success("You have logged in");
    navigate("/userhome");
  } catch (e) {
    console.error(e);
    toast.error(e?.response?.data?.message || "Login failed.");
  }
}

export const signupUser = (signupData, toast, navigate) => async (dispatch) => {
  try {
    const res = await api.post("/users/create", signupData);
    toast.success(res.data.message || "You have successfully registered.");
    navigate("/");
  } catch (e) {
    console.error(e);
    toast.error(e?.response?.data?.message || "Couldn't sign up");
  }
};

export const logOutUser = (navigate) => async (dispatch) => {
  dispatch({ type: "SIGN_OUT"});
  localStorage.removeItem("authentication");
  navigate("/");
}