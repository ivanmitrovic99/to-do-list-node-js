const login = async (name, email, password, passwordConfirm) => {
  console.log("test2");
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
      alert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/overview");
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

const form = document.getElementById("loginForm");

form.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  login(email, password);
});
