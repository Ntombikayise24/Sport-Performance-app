import axios from "axios";
import { API_URL } from "../config/config";

export async function createAccount(
  surname: string,
  name: string,
  password: string,
  email: string,
  idNumber: string,
  race: string,
  role: string,
  roletype: string
) {
  const url = `${API_URL}/api/Auth/RegisterUser`;
  const { data } = await axios.post(url, {
    surname,
    name,
    password,
    email,
    idNumber,
    race,
    role,
    roletype,
  });

  return data;
}

export async function loginUser(email: string, password: string) {
  const url = `${BASE_URL}/api/Auth/Login`;
  const { data } = await axios.post(url, {
    email,
    password,
  });

  return data;
}
