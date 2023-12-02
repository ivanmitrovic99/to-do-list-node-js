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
      alert("success", "Sign Up successfull! Check your email for the activation token!");
      //   window.setTimeout(() => {
      //     location.assign("/signupSuccess");
      //   }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
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
