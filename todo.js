function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.completed) li.style.textDecoration = "line-through";
    li.onclick = () => toggleComplete(index);
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.onclick = (e) => { e.stopPropagation(); deleteTodo(index); };
    li.appendChild(del);
    list.appendChild(li);
  });
}
function addTodo() {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (!text) return;
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push({ text, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));
  input.value = "";
  loadTodos();
}
function toggleComplete(index) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos[index].completed = !todos[index].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  loadTodos();
}
function deleteTodo(index) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  loadTodos();
}
document.addEventListener("DOMContentLoaded", loadTodos);