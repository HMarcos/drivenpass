import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routers/index.js";
import handleErros from "./middlewares/handleErrorsMiddleware.js";
import logging from "./utils/logging.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(handleErros);

const PORT = +process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(logging.info(`The server is running on PORT ${PORT}...`));
});