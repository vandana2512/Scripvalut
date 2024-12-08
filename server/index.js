import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserAuthRoutes from "./routes/UserAuthRoutes.js";
import StockRoutes from "./routes/StockRoutes.js";
import MutualFundRoutes from "./routes/MutualFundRoutes.js";
import Connect from "./db/connect.js";
import cluster from "cluster";
import os from "os";

dotenv.config();

const PORT = process.env.PORT || 8080;
const numCPUS = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUS; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);

    cluster.fork();
  });
} else {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: [
        process.env.FRONTEND_URL,
        "https://scripvalutapi.onrender.com/",
        "https://scripvalut.vercel.app/",
      ],
    })
  );

  app.use("/api/user_auth/", UserAuthRoutes);

  app.use("/api/stocks", StockRoutes);

  app.use("/api/mutualfund", MutualFundRoutes);

  app.listen(PORT, () => {
    Connect();
    console.log(`Server is running at ${PORT}`);
  });
}
