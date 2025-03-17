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
});

// ----- routes -----

// List todos
app.get("/", async (req, res) => {
  const todos = await listTodos();

  res.render("pages/index.njk", { todos });
});

// Add todo
app.post("/todos", async (req, res) => {
  if (!req.body.title) {
    res
      .status(400)
      .set("Content-Type", "text/html")
      .send(
        `<p id="todo-form-error" class="text-red-500">Title is required</p>`
      );

    return;
  }

  const todos = await addTodo(req.body.title);

  const emptyError = `<p id="todo-form-error" hx-swap-oob="true" class="text-red-500"></p>`;
  const todolist = nunjucks.render("components/molecules/todolist.njk", {
    todos,
  });

  res.send(todolist + emptyError);
});

// Toggle todo
app.post("/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todos = await toggleTodo(id);

    res.render("components/molecules/todolist.njk", { todos });
  } catch (error) {
    res.status(404).send();
  }
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await deleteTodo(id);

    res.status(200).send();
  } catch (error) {
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
