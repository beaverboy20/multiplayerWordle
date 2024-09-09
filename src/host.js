var letterIndex = 0;
var letters = [];
var currentRowElement;
var currentRow = "row1";
function newRow(){
    currentRowElement = document.getElementById(currentRow);
    for (const element of currentRowElement.children){
		letters.push(element);
	}
}
newRow();


function hostStart(){
    let theNameOfTheURL = window.locaton;
    console.log("S");
    window.location.href = "host.html";
    

}

function keyPress(event){
    var key;
    if (window.event) {
        key = event.keyCode;
    } else if (event.which) {
        key = event.which;
    }
    
    letters[letterIndex].innerHTML = key;
}



document.addEventListener("keydown", function(event){
	console.log(event.code[3]);
	if (/[A-Z]/.test(event.code[3])){
		if (letterIndex >= 0 && letterIndex < 5) {
			letters[letterIndex].innerHTML = event.code[3];
			letterIndex++;
		}
	}
	if (event.code[3] == "k"){
		if (letterIndex > 0) letterIndex--;
		letters[letterIndex].innerHTML = "";
	}
	//event.code[3];
	//letterIndex += 1;
}); 






