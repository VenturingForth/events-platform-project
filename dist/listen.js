"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const { PORT = 9090 } = process.env;
app_1.app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
