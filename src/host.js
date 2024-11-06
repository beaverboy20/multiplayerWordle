var letterIndex = 0;
var letters = [];
var currentRowElement;
var currentRow = "row1";
var word = "";

import { words } from './words.js'

function generateWord(){
	word = words[Math.floor(Math.random()*489)]
	document.getElementById("word").innerText = word.toUpperCase();
	return(word);
}
generateWord();

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
	} else if (event.code[3] == "e"){
		
	}
}); 
