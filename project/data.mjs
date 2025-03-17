import fs from "node:fs";

export async function listTodos() {
  const todos = JSON.parse(fs.readFileSync("todos.json", "utf-8"));

  return Promise.resolve(todos);
}

export async function addTodo(title) {
  const todos = await listTodos();
  const todo = { id: crypto.randomUUID(), title, done: false };
  todos.push(todo);

  fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));

  return Promise.resolve(todos);
}

export async function toggleTodo(id) {
  const todos = await listTodos();
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );

  fs.writeFileSync("todos.json", JSON.stringify(updatedTodos, null, 2));

  return Promise.resolve(updatedTodos);
}

export async function deleteTodo(id) {
  const todos = await listTodos();
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return Promise.reject(new Error("Todo not found"));
  }

  todos.splice(index, 1);

  fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
}
