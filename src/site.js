window.logout = function () {
  window.location.pathname = "/index.html";
};

window.onload = function () {
  var team = sessionStorage.getItem("currentTeam");
  if (team == null && window.location.pathname != "/index.html") {
    window.location.pathname = "index.html";
  }
};