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

// ----- subscribers -----

const clients = new Set();

function notifyClients(todos) {
  const renderedTodos = nunjucks
    .render("components/molecules/todolist.njk", { todos })
    .replace(/(\r\n|\n|\r)/gm, "");

  for (const client of clients) {
    client.write(`data: ${renderedTodos}\n\n`);
  }
}

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
  // const renderedTodos = nunjucks.render("components/molecules/todolist.njk", {
  //   todos,
  // });

  notifyClients(todos);

  res.send(
    // renderedTodos +
    `<p id="todo-form-error" class="text-red-500"></p>`
  );
});

// Toggle todo
app.post("/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todos = await toggleTodo(id);

    // res.render("components/molecules/todolist.njk", { todos });

    notifyClients(todos);
    res.status(204).send();
  } catch (error) {
    res.status(404).send();
  }
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todos = await deleteTodo(id);
    notifyClients(todos);

    // res.status(200).send();
    res.status(204).send();
  } catch (error) {
    res.status(404).send();
  }
});

// Server-sent events
app.get("/live", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  clients.add(res);

  res.on("close", () => {
    console.log("Client closed connection.");

    clients.delete(res);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
