import express from "express";
import bodyParser from "body-parser";
import nunjucks from "nunjucks";

import { listTodos, toggleTodo, addTodo, deleteTodo } from "./data.mjs";

const app = express();
const port = 3000;

// ----- configuration -----

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true,
});

// ----- routes -----

// List todos
app.get("/", async (req, res) => {
  const todos = await listTodos();

  res.render("pages/index.njk", { todos });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
