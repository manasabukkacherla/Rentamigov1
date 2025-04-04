import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";

// Create a single socket connection to the backend.
// Ensure the URL matches your backend server (port 5003 in this case).
const socket = io("http://localhost:8000", {
  path: "/socket.io",
});

// Wrap the createContext call in parentheses to disambiguate the generic syntax.
export const SocketContext = createContext<Socket>(socket);
