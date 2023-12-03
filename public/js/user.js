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
      alert("success", "Logged in successfully!");
      window.location.assign("/overview");
    }
  } catch (err) {
    alert(err);
  }
};

const form = document.getElementById("form");
form.addEventListener("submit", e => {
  e.preventDefault();
  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  updatePassword(currentPassword, newPassword);
});
