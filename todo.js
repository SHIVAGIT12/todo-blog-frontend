function loadTodos(filter = 'all') {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    if (filter === 'completed' && !todo.completed) return;
    if (filter === 'pending' && todo.completed) return;

    const li = document.createElement("li");
    li.textContent = `${todo.text} (Due: ${todo.dueDate || 'No date'})`;
    if (todo.completed) li.style.textDecoration = "line-through";
    li.onclick = () => toggleComplete(index);

    const priority = document.createElement("span");
    priority.textContent = todo.priority || "Normal";
    priority.style.marginRight = "10px";
    li.prepend(priority);

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
  const dueDate = document.getElementById("todo-date").value;
  if (!text) return;
  const priority = prompt("Set priority (Low, Normal, High):", "Normal");
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push({ text, completed: false, priority, dueDate });
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
function filterTasks(filter) {
  loadTodos(filter);
}
document.addEventListener("DOMContentLoaded", () => loadTodos());