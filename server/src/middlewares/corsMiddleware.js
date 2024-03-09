import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const corsMiddleware = cors({
  methods: "PUT,POST,GET,DELETE",
  origin: process.env.CLIENT_URL,
  credentials: true,
});
export default corsMiddleware;
