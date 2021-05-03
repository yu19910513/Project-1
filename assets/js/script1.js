var buttonClickEl = document.querySelectorAll(".state-buttons");
function statebuttonHandler(event) {
  //   console.log("here");
  //   console.log("###################", event);
  var stateName = event.target.textContent;
  console.log("@@@@@@@@@@@@@@@@@@", stateName);
  localStorage.setItem("StateVisited", stateName);
  window.location.href = "page2.html";
}

for (let i = 0; i < buttonClickEl.length; i++) {
  buttonClickEl[i].addEventListener("click", statebuttonHandler);
}
