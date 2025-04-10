import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import categoriesRouter from "./routes/categories.js";
import citiesRouter from "./routes/cities.js";
import sequelize from "./database.js";
import User from "./models/User.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/categories", categoriesRouter);
app.use("/cities", citiesRouter);

app.get("/ping", (req, res) => {
  res.send("pong")
})

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

app.get("/admin", (req, res) => {
  res.send("Панель администратора");
});
