const showError = function (err) {
  const popup = document.querySelector(".error-popup");
  const message = document.querySelector(".error-popup .error-msg");
  message.innerHTML = err;
  popup.classList.add("active");
  setTimeout(function () {
    popup.classList.remove("active");
  }, 5000);
};

const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/overview");
      }, 500);
    }
  } catch (err) {
    showError(err.response.data.message);
  }
};

const form = document.getElementById("loginForm");

form.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  login(email, password);
});
