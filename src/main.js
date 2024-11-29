var letterIndex = 0;
var letters = [];
var currentRowElement;
var currentRow = "row0";
var word = "";
var messageField = document.getElementById("message");
const urlParameters = new URLSearchParams(window.location.search)
const name = urlParameters.get("name");
const role = urlParameters.get("role");

import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"


if (role == "host"){
	var peer = new Peer("hasd", {
		debug: 3, 
		//host: "localhost",
		//port: 8080

	});
	
	peer.on("open", () => {
		const conn = peer.connect("casd");
		conn.on("open", () => {
			conn.send("hi oggabooga");
			console.log('ssssss');
		})
		
	});
	
}

else {
	var peer = new Peer("casd", {
		debug: 3,
		//host: "localhost",
		//port: 8080
	});
	peer.on('connection', function(conn) {
		conn.on("data", function(data){
			console.log(data);
		})
	});

}
function sendMore(){
	
	conn.send("hi oggabooga");
}


import { words } from './words.js'

function generateWord(){
	word = words[Math.floor(Math.random()*489)]
	document.getElementById("word").innerText = word.toUpperCase();
	return(word);
}
generateWord();

function newRow(first = false){
	if (!first){
		for (var i = 0; i < 5; i++){
			if (letters[i].innerHTML == word[i]){
				letters[i].classList.add('correctC');
			} else if (word.includes(letters[i].innerHTML)){
				letters[i].classList.add("incorrectC");
			}
		}
	}
	letters = [];
	letterIndex = 0;
	currentRow = (currentRow.slice(0, -1))+(parseInt(currentRow[3])+1).toString()
	currentRowElement = document.getElementById(currentRow);
	for (const element of currentRowElement.children){
		letters.push(element)
	}
}
newRow(true);

function typedWord(){
	var typedWord = "";
	for(var i = 0; i < 5; i++){
		typedWord += letters[i].innerHTML;
	}
	return typedWord;
}

document.addEventListener("keydown", function(event){
	if (/[A-Z]/.test(event.code[3])){ //letter
		sendMore();
		if (letterIndex >= 0 && letterIndex < 5) {
			letters[letterIndex].innerHTML = event.code[3];
			letterIndex++;
		}
	} else if (event.code[3] == "k"){ //backspace
		if (letterIndex > 0) letterIndex--;
		letters[letterIndex].innerHTML = "";
	} else if (event.code[3] == "e"){ //enter
		if(letterIndex != 5) {
			messageField.innerHTML = "Type a 5 letter word";
		} else if(words.includes(typedWord()) == false) {
			messageField.innerHTML = "Not a word";
		} else {
			messageField.innerHTML = "";
			newRow();
		}
	}
}); 
