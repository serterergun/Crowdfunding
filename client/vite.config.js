import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Specify a port number
    port: 3000,  // Change to any port number you prefer
    // Allow access from network devices
    host: true
  },
  define: {
    global: "globalThis",
    "process.env": {},
  },
});
