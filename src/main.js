var letterIndex = 0;
var letters = [];
var otherLetterIndex = 0;
var otherLetters =[];
var currentRowElement;
var currentRow = "row0";
var otherCurrentRowElement;
var otherCurrentRow = "roo0";
var word = "";
var messageField = document.getElementById("message");
const urlParameters = new URLSearchParams(window.location.search)
const name = urlParameters.get("name");
const role = urlParameters.get("role");
var end = false;

import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"
import { words } from './words.js';

var peer = new Peer(name, { debug: 3, });


function log(message){
	messageField.appendChild(document.createElement("br"));
	messageField.innerHTML += message
	if (messageField.getElementsByTagName("br").length > 2){
		const parts = messageField.innerHTML.split(/br/)
		messageField.innerHTML = parts.length > 1 ? parts.slice(1).join('<br>') : '';
		messageField.innerHTML = messageField.innerHTML.replace(/\/>/g, '');
	}
}


function newRow(grid, first = false){
	console.log(word);
	if (grid == "left"){
		if (!first){
			var correctN = 0;
			for (var i = 0; i < 5; i++){
				if (letters[i].innerHTML == word[i]){
					console.log('s');
					letters[i].classList.add("correctC");
					correctN++;
				} else if (word.includes(letters[i].innerHTML)){
					letters[i].classList.add("incorrectC");
				}
			}
			if (correctN == 5){
				document.body.style.background = "green";
				end = true;
				log("you win");
			}
		}
		letters = [];
		letterIndex = 0;
		currentRow = (currentRow.slice(0, -1))+(parseInt(currentRow[3])+1).toString()
		currentRowElement = document.getElementById(currentRow);
		for (const element of currentRowElement.children){
			letters.push(element)
		}
	} else {
		if (!first){
			var correctN = 0;
			for (var i = 0; i < 5; i++){
				if (otherLetters[i].innerHTML == word[i]){
					otherLetters[i].classList.add("correctC");
					correctN++;
				} else if (word.includes(otherLetters[i].innerHTML)){
					otherLetters[i].classList.add("incorrectC");
				}
			}
			if (correctN == 5){
				document.body.style.background = "red";
				end = true;
				log("you loose");
			}
		}
		otherLetters = [];
		otherLetterIndex = 0;
		otherCurrentRow = (otherCurrentRow.slice(0, -1)+(parseInt(otherCurrentRow[3])+1).toString())
		otherCurrentRowElement = document.getElementById(otherCurrentRow);
		for (const element of otherCurrentRowElement.children){
			otherLetters.push(element)
		}
	}
}

function typedWord(grid = "right"){
	var typedWord = "";
	for(var i = 0; i < 5; i++){
		if (grid != "right"){
			typedWord += letters[i].innerHTML;
		} else {
			typedWord += otherLetters[i].innerHTML;
		}
	}
	return typedWord;
}

if (role == "host"){
	newRow("left", true);
	newRow("right", true);

	word = words[Math.floor(Math.random()*489)]
	document.getElementById("word").innerText = word.toUpperCase();
	log("waiting for a connection"); 
	peer.on("error", error => {
		if (error.type === "unavailable-id") { log("host name taken. choose a differant one"); } 
		else { console.log("error aaaaaaa"); }
	});
	peer.on('connection', conn => {
		conn.on("close", () => { log("client disconnected"); });
		log("client connected");
		log("type your guess");
		conn.on("open", () => {
			conn.send("W"+word);
		});
		conn.on("data", (data) => {
			if (data.length == 1){
				if (/[A-Z]/.test(data)){ //letter
					if (otherLetterIndex >= 0 && otherLetterIndex < 5) {
						otherLetters[otherLetterIndex].innerHTML = data;
						otherLetterIndex++;
					}
				} else if (data == "k"){ //backspace
					if (otherLetterIndex > 0) {
						otherLetterIndex--;
						otherLetters[otherLetterIndex].innerHTML = "";	
					}
				} else if (data == "e"){
					if(otherLetterIndex != 5) {
						log("Type a 5 letter word");
					} else if(words.includes(typedWord("right")) == false) {
						log("Not a word");
					} else {
						newRow("right");
					}
				}
			}		

		});
		document.addEventListener("keydown", function(event){
			if (!end){
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
						log("Type a 5 letter word");
					} else if(words.includes(typedWord("left")) == false) {
						log("Not a word");
					} else {
						newRow("left");
					}
				}
				conn.send(event.code[3]);
			};
		}); 
	});
};


if (role == "client"){ 
	newRow("left", true);
	newRow("right", true);

	log("searching for host");
	peer.on("error", error => {
		if (error.type === "peer-unavailable") { log("no host found. you probabaly typed it wrong. refresh to search again."); } 
		else if (error.type === "unavailable-id") { console.log("unavailable-id"); } 
		else { console.log("error aaaaaaa"); }
	});
	peer.on("open", () => {
		const conn = peer.connect("h"+name.slice(1));
		conn.on("close", () => { log("disconnected from host"); });
		conn.on('open', () => { 
			log("connected to host"); 
			log("type your guess");
		});
		conn.on("data", (data) => {
			if (data.length > 5 && data[0] == "W"){
				document.getElementById("word").innerText = data.slice(1).toUpperCase();
				word = data.slice(1).toUpperCase();
			}
			if (data.length == 1){
				if (/[A-Z]/.test(data)){ //letter
					if (otherLetterIndex >= 0 && otherLetterIndex < 5) {
						otherLetters[otherLetterIndex].innerHTML = data;
						otherLetterIndex++;
					}
				} else if (data == "k"){ //backspace
					if (otherLetterIndex > 0) {
						otherLetterIndex--;
						otherLetters[otherLetterIndex].innerHTML = "";	
					}
				} else if (data == "e"){
					if(otherLetterIndex != 5) {
						log("Type a 5 letter word");
					} else if(words.includes(typedWord("right")) == false) {
						log("Not a word");
					} else {
						newRow("right");
					}
				}
			}
		});
		document.addEventListener("keydown", function(event){
			if (!end){
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
						log("Type a 5 letter word");
					} else if(words.includes(typedWord("left")) == false) {
						log("Not a word");
					} else {
						newRow("left");
					}
				}
				conn.send(event.code[3]);
			};
		}); 
	});
};