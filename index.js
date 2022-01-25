var letterpairs;
function getLetterpairs() {
    let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwxZV9pi9TY6zs6GITcmMjXPuneZZk0kWtR5BQaPYullUgfy8iedH9X3hoJyv12j7aT0FTyH6uZjrR/pub?gid=0&single=true&output=csv";
    return fetch(url).then(res => res.text().then(letterpairs => {return letterpairs}).catch(err => console.log(err)));
}

async function init() {
    letterpairs = (await getLetterpairs()).split("\n").map(l => l.split(","));
    letterpairs.shift()
    getNextLetterpair();
}

function getLetterpairWithWord(startLetter) {
    let x = startLetter === undefined ? Math.round(Math.random() * 24) : startLetter.charCodeAt(0) - 65
    let y = Math.round(Math.random() * 24)
    return { word: letterpairs[x][y], letterpair: String.fromCharCode(65 + x) + String.fromCharCode(Math.max(65, 65 + y - 1))};
}

function getNextLetterpair() {
    let letter = document.getElementById("letter").value != "ALL" ? document.getElementById("letter").value : undefined;
    let obj = getLetterpairWithWord(letter);
    document.getElementById("letterpair").innerText = obj.letterpair;
    document.getElementById("word").innerText = obj.word;
}

function onLetterChangeEvent(event) {
    document.cookie = event.target.value;
    getNextLetterpair();
}

init();