var letterIndex = 0;
var letters = [];
var currentRowElement;
var currentRow = "row1";

import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

function connect() {
    var fpeerIDField = document.querySelector("#fpeerid")
    console.log("connecting to " + fpeerIDField.value)
    conn = peer.connect(fpeerIDField.value);

    // open event called when connection gets created
    conn.on('open', function () {
        console.log("connected")
    });
}

function newRow(){
    currentRowElement = document.getElementById(currentRow);
    for (const element of currentRowElement.children){
		letters.push(element);
	}
}
newRow();

document.addEventListener("keydown", function(event){
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
