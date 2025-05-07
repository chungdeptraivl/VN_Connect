import { axiosInstance } from "./axiosConfig";

export const signupFn = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};
