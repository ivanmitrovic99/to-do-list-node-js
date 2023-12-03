const createTodo = async (name, task) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/users/createTodo",
      data: {
        name,
        task,
      },
    });

    if (res.data.status === "success") {
      alert("success");
      window.location.assign("/overview");
    }
  } catch (err) {
    alert(err);
  }
};

const updateTodo = async (id, name, task) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `/api/todos/${id}`,
      data: {
        name,
        task,
      },
    });

    if (res.data.status === "success") {
      alert("success", "Logged in successfully!");
      window.location.assign("/overview");
    }
  } catch (err) {
    alert(err);
  }
};

const deleteTodo = async id => {
  try {
    const res = await axios({
      method: "GET",
      url: `/delete/${id}`,
    });

    if (res.status === 200) {
      alert("success", "Logged in successfully!");
      window.location.assign("/overview");
    }
  } catch (err) {
    alert(err);
  }
};

const completeTodo = async id => {
  try {
    const res = await axios({
      method: "GET",
      url: `/complete/${id}`,
    });
    console.log(res);

    if (res.status === 200) {
      alert("success", "Logged in successfully!");
      window.location.assign("/overview");
    }
  } catch (err) {
    alert(err);
  }
};

const updateBtns = document.querySelectorAll(".update-btn");
const deleteBtns = document.querySelectorAll(".delete-btn");
const completeBtns = document.querySelectorAll(".compelete-btn");
const logoutBtn = document.querySelector(".logout-btn");
deleteBtns.forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    const id = e.target.dataset.id;

    deleteTodo(id);
  });
});
completeBtns.forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    const id = e.target.dataset.id;

    completeTodo(id);
  });
});
const updateForm = document.getElementById("updateForm");
updateBtns.forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();

    document.querySelector("#todo-id").value = e.target.dataset.id;
    document.querySelector("#update-name").value = e.target.parentNode.querySelector("h2").innerHTML;
    document.querySelector("#update-task").value = e.target.parentNode.querySelector("p.todo-task").innerHTML;
  });
});

const createForm = document.getElementById("createForm");

createForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const task = document.querySelector("#task").value;

  createTodo(name, task);
});

updateForm.addEventListener("submit", e => {
  e.preventDefault();
  const id = document.querySelector("#todo-id").value;
  const name = document.querySelector("#update-name").value;
  const task = document.querySelector("#update-task").value;

  updateTodo(id, name, task);
});

logoutBtn.addEventListener("click", async e => {
  e.preventDefault();
  try {
    const res = await axios({
      method: "GET",
      url: `/api/users/logout`,
    });

    if (res.status === 200) {
      alert("success", "Logged in successfully!");
      window.location.assign("/");
    }
  } catch (err) {
    alert(err);
  }
});
