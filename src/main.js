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
var peer = new Peer(name, { debug: 3, });

function peerSR(sendOrRecieve, message = "nothing"){
	if (role == "host"){
		if (sendOrRecieve == "init") { 
			word = words[Math.floor(Math.random()*489)]
			document.getElementById("word").innerText = word.toUpperCase();
			messageField.innerHTML = "waiting for a connection"; 
		}
		peer.on("error", error => {
			if (error.type === "unavailable-id") { messageField.innerHTML = "host name taken. choose a differant one"; } 
			else { console.log("error aaaaaaa"); }
		});
		peer.on('connection', conn => {
			if (sendOrRecieve == "init") { 
				peerSR("send", word);
				console.log(message);
				messageField.innerHTML = ""; 
			} else {
			if (sendOrRecieve == "send") {conn.on("open", () => {
				conn.send(message);
			})};
			if (sendOrRecieve == "recieve") {conn.on("data", (data) => {
				console.log(data);
				return data;
			})};
		}});
	};
	if (role == "client"){ 
		peer.on("error", error => {
			if (error.type === "peer-unavailable") { messageField.innerHTML = "no host found. you probabaly typed it wrong. refresh to search again."; } 
			else if (error.type === "unavailable-id") { console.log("unavailable-id"); } 
			else { console.log("error aaaaaaa"); }
		});
		peer.on("open", () => {
			const conn = peer.connect("h"+name.slice(1));
			if (sendOrRecieve == "send") {conn.on("open", () => { 
				conn.send(message);
			})};
			if (sendOrRecieve == "recieve" || sendOrRecieve == "init") { conn.on("data", (data) => {
				if (sendOrRecieve = "init"){ document.getElementById("word").innerText = data.toUpperCase(); }
				console.log(data);
				return data;
			})};
		});
	};
};
peerSR("init", word);

if (role == "host"){
	peerSR("send", "hello from host");
} 
if (role == "client"){
	peerSR("recieve");
}
if (role == "host"){
	peerSR("send", "hello from host 222222");
} 
if (role == "client"){
	peerSR("recieve");
}

import { words } from './words.js';

function newRow(first = false){
	if (!first){
		for (var i = 0; i < 5; i++){
			if (letters[i].innerHTML == word[i]){
				letters[i].classList.add('correctC');
			} else if (word.includes(letters[i].innerHTML)){
				letters[i].classList.add("incorrectC");
			}
		}
		console.log('s');
		peerSR("send", letters);
		peerSR("recieve");
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
