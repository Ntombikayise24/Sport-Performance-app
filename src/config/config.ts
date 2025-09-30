import { Platform } from "react-native";

const PORT = 5161;

// TODO: Replace 'your_pc_ip_address' with your actual PC's local network IP address if testing on a real device
const PC_IP_ADDRESS = "your_pc_ip_address";

export const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:" + PORT
    : Platform.OS === "ios"
    ? "http://localhost:" + PORT
    : `http://${PC_IP_ADDRESS}:${PORT}`;

/*
 * For a real device, set PC_IP_ADDRESS above to your PC's IP address on the local network.
 * Example: const PC_IP_ADDRESS = "192.168.1.100";
 * This allows the device to reach the backend server running on your PC.
 */
