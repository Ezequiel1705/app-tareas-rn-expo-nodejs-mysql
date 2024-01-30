import express from "express";
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import { swaggerSpecs } from "./swaggerSpecs.js";
import router from "./routes/index.js";



//object cors
const corsOptions = { 
    origin: process.env.ROO_CLIENT,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
};

const app = express();

// middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", router)
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerSpecs))


//server
const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
});
server.on("error", err => console.log(err));

export default app;
