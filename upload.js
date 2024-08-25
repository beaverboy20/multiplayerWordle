var button = document.getElementById("buttonID");
button.addEventListener("click", upload);


function upload(){
  fetch("https://discord.com/api/webhooks/1277271624462372955/rNoo66rZsa0c5-77aNC3EolD0P3kUKay6joXNscLTjbHa3SDYrIZkT3uofoODrygZGt5", {
    body: JSON.stringify({
      content: `type your message here`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (res) {
      console.log(res);
    });
}
