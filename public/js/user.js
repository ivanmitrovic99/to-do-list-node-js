const showError = function (err) {
  const popup = document.querySelector(".error-popup");
  const message = document.querySelector(".error-popup .error-msg");
  message.innerHTML = err;
  popup.classList.add("active");
  setTimeout(function () {
    popup.classList.remove("active");
  }, 5000);
};
const updatePassword = async (currentPassword, newPassword) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `api/users/changePassword`,
      data: {
        currentPassword,
        newPassword,
      },
    });

    if (res.data.status === "success") {
      showError("Logged out!");
      window.location.assign("/overview");
    }
  } catch (err) {
    showError(err);
  }
};

const form = document.getElementById("form");
form.addEventListener("submit", e => {
  e.preventDefault();
  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  updatePassword(currentPassword, newPassword);
});
