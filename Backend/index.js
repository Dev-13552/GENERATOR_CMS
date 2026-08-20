import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/v1/index.js";
import { dbConnect } from "./config/database.js";
import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: ["http://localhost:5173", "https://generator-cms.vercel.app"],
    credentials: true
}))


app.use(express.json());
app.use("/v1", router);

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(errorHandler)

app.listen(port, () => {
  dbConnect();
  console.log(`Server Started Successfully at`, port);
});
