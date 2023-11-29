window.logout = function () {
  window.location.pathname = "/index.html";
  localStorage.removeItem('currentTeam')
};

window.onload = async function () {
  var team = sessionStorage.getItem("currentTeam");
  if (team == null && window.location.pathname != "/index.html") {
    window.location.pathname = "index.html";
  }
};

window.makeToast = function (content) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap =
    bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
  var body = (document.getElementById("toastBody").innerHTML = content);
};