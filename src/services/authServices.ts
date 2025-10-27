import { registerApi } from "../api/authApi";

interface NewUser {
  username: string;
  password: string;
  confirmPassword: string,
}

const signUpUserApi = async (userData: NewUser) => {
  const apiData: NewUser = {
    username: userData.username,
    password: userData.password,
    confirmPassword: userData.confirmPassword,
  };

  return await registerApi(apiData);
};

export default signUpUserApi;
