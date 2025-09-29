import { Platform } from "react-native";

const PORT = 5161;
export const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:" + PORT
    : "http://localhost:" + PORT;

/*
 * for a real device, change the API_URL to this:
  * export const API_URL = "http://pc_ip_address:" + PORT;
 */