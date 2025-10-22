import axiosClient from '../axios-config/axiosClient';

interface NewUser {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const registerApi = async (userData: NewUser) => {
  const apiData: NewUser = {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    firstName: userData.username,
    lastName: 'user',
  };

  return await axiosClient.post('/users/add', apiData);
};

export default registerApi;
