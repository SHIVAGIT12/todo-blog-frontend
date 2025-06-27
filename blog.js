function loadBlogs() {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const list = document.getElementById("blog-list");
  list.innerHTML = "";
  blogs.reverse().forEach((blog, index) => {
    const post = document.createElement("div");
    post.className = "blog-post";
    post.innerHTML = `<h3>${blog.title}</h3><p>${blog.content}</p>`;
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editBlog(index);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteBlog(index);
    post.appendChild(editBtn);
    post.appendChild(deleteBtn);
    list.appendChild(post);
  });
}
function addBlogPost() {
  const title = document.getElementById("blog-title").value.trim();
  const content = document.getElementById("blog-content").value.trim();
  if (!title || !content) return;
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.push({ title, content });
  localStorage.setItem("blogs", JSON.stringify(blogs));
  document.getElementById("blog-title").value = "";
  document.getElementById("blog-content").value = "";
  loadBlogs();
}
function editBlog(index) {
  const blogs = JSON.parse(localStorage.getItem("blogs"));
  const blog = blogs[index];
  document.getElementById("blog-title").value = blog.title;
  document.getElementById("blog-content").value = blog.content;
  blogs.splice(index, 1);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  loadBlogs();
}
function deleteBlog(index) {
  const blogs = JSON.parse(localStorage.getItem("blogs"));
  blogs.splice(index, 1);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  loadBlogs();
}
document.addEventListener("DOMContentLoaded", loadBlogs);