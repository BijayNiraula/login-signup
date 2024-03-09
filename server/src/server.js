import DotEnv from "dotenv";
DotEnv.config();
import express from "express";
import authenticationRoute from "./routes/authentication.route.js";
import errorHanderMidleware from "./middlewares/errorHandler.middleware.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";
import connectMongodb from "./database/connectMongodb.js";
const app = express();
const PORT = 8000 || process.env.PORT;

// middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/user", authenticationRoute);

app.use(errorHanderMidleware);

const startServer = async () => {
  await connectMongodb();
  app.listen(PORT, () => {
    console.log("server started in Port :" + PORT);
  });
};

startServer();
