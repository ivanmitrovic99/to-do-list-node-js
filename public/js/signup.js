const showError = function (err) {
  const popup = document.querySelector(".error-popup");
  const message = document.querySelector(".error-popup .error-msg");
  message.innerHTML = err;
  popup.classList.add("active");
  setTimeout(function () {
    popup.classList.remove("active");
  }, 5000);
};

const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      showError("Sign Up successfull! Check your email for the activation link!");
    }
  } catch (err) {
    showError(err.response.data.message);
  }
};

const form = document.getElementById("signupForm");

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const passwordConfirm = document.querySelector("#password-confirm").value;
  signup(name, email, password, passwordConfirm);
});
