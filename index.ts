import express from "express";
import router from "./routes/index";

const app = express();

app.use(express.json());

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.use("/api/v1",router)

app.listen(PORT,()=>{
    console.log(`application is running on https://localhost:${PORT}`)
});