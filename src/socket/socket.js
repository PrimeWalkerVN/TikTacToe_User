import { io } from "socket.io-client";

const ENDPOINT = 'http://localhost:8080';
const socket = io(ENDPOINT);

export default socket