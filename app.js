import express from "express"
import connectDB from "./config/config.js"

import UserRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const PORT = process.env.PORT || 5000;

// Routes
app.use("/user", UserRouter)

app.get("/", (req, res) => {
    res.status(200).json({message: "🦆 2 3 con vịt"})
})

app.use("/*", (req, res) => {
    res.status(404).json({message: "Page not found!"})
})


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});