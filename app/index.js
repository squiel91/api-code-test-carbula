
import express from "express";
import _ from "lodash";
import routeList from "./routes";
import compression from 'compression';

const app = express();
const cors = require("cors");


app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(compression())

routeList(app);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Running server at http://localhost:${process.env.PORT || 4000}`);
});