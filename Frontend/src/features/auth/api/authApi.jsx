import  api  from "../../../config/api";

export const registerApi =  async (data) => {
    try {
      const res = await api.post("/v1/auth/register", data);
      return res.data;
    } catch (error) {
      console.log("Error in submitting data while registering user", error);
    }
}
export const loginApi =  async (data) => {
    try {
      const res = await api.post("/v1/auth/login", data);
      return res.data;
    } catch (error) {
      console.log("Error in submitting data while registering user", error);
    }
}