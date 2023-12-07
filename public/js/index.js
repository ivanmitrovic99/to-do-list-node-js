const showError = function (err) {
  const popup = document.querySelector(".error-popup");
  const message = document.querySelector(".error-popup .error-msg");
  message.innerHTML = err;
  popup.classList.add("active");
  setTimeout(function () {
    popup.classList.remove("active");
  }, 5000);
};
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
      window.location.assign("/overview");
    }
  } catch (err) {
    showError(err);
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
      window.location.assign("/overview");
    }
  } catch (err) {
    showError(err);
  }
};

const deleteTodo = async id => {
  try {
    const res = await axios({
      method: "GET",
      url: `/delete/${id}`,
    });

    if (res.status === 200) {
      showError("Deleted succesfully!");
      window.location.assign("/overview");
    }
  } catch (err) {
    showError(err);
  }
};

const completeTodo = async id => {
  try {
    const res = await axios({
      method: "GET",
      url: `/complete/${id}`,
    });

    if (res.status === 200) {
      window.location.assign("/overview");
    }
  } catch (err) {
    showError(err);
  }
};

const closeBtns = document.querySelectorAll(".close-btn");
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
    updateForm.classList.add("active");
    document.querySelector("#todo-id").value = e.target.dataset.id;
    document.querySelector("#update-name").value = e.target.parentNode.parentNode.querySelector("h2 span").innerHTML;
    document.querySelector("#update-task").value =
      e.target.parentNode.parentNode.querySelector("p.todo-task span").innerHTML;
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

closeBtns.forEach(el => {
  el.addEventListener("click", function () {
    createForm.classList.remove("active");
    updateForm.classList.remove("active");
  });
});

const createBtns = document.querySelectorAll(".create-btn");
createBtns.forEach(el => {
  el.addEventListener("click", () => {
    createForm.classList.add("active");
  });
});

logoutBtn.addEventListener("click", async e => {
  e.preventDefault();
  try {
    const res = await axios({
      method: "GET",
      url: `/api/users/logout`,
    });

    if (res.status === 200) {
      showError("Logging out!");
      window.location.assign("/");
    }
  } catch (err) {
    showError(err);
  }
});
