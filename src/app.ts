import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(errorHandler);
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
