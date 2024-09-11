var letterIndex = 0;
var letters = [];
var currentRowElement;
var currentRow = "row1";

var word;
function generateWord(){
    fetch("../wordList.txt")
        .then(response => response.text())
        .then(text => console.log(text))
}
generateWord();

function newRow(){
    currentRowElement = document.getElementById(currentRow);
    for (const element of currentRowElement.children){
		letters.push(element);
	}
}
newRow();

var topText = document.getElementById("mainText");
function hostStart(){
    let theNameOfTheURL = window.locaton;
    console.log("S");
    window.location.href = "host.html";
    topText.innerHTML = "host name:";

}



document.addEventListener("keydown", function(event){
	console.log(event.code[3]);
	if (/[A-Z]/.test(event.code[3])){
		if (letterIndex >= 0 && letterIndex < 5) {
			letters[letterIndex].innerHTML = event.code[3];
			letterIndex++;
		}
	} else if (event.code[3] == "k"){
		if (letterIndex > 0) letterIndex--;
		letters[letterIndex].innerHTML = "";
	}
}); 






