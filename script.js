

ageInDays = () =>{
    let age = prompt("What year were you born...Good Friend?");
    age = (2020-age)*365;
    document.getElementById("output1").innerText = `You are ${age} days old`;
}

refresh = () => {
    window.location.reload();
}


generateCats = () => {
    
    let headers = {
        'Content-Type': 'application/json',
        'x-api-key': '0b4d2ed9-04d2-4e6c-bb7a-606a19b1f64b'
    };
    
    fetch('https://api.thecatapi.com/v1/images/search?format=json', {
        method: 'GET',
        headers: headers
    }).then((response) =>{
        return response.json();
    }).then((data) => {
        // data[0].width = 40;
        // data[0].height = 40;
        let url = data[0].url;
        let area = document.getElementById("output2");
        let img = document.createElement("img");
        img.src = url;
        img.style.height = `250px`;
        img.style.width = `250px`;
        area.appendChild(img);
    })
    
}

let track = {
    "won": 0,
    "lose": 0,
    "tie": 0,
    "hit": 0,
};

record = (res) => {
    track[res] += 1;
    
}

let getRandomInt = () => {
    let randomNumber = Math.random();
    let wholeNumber = Math.floor(randomNumber*3) + 1;
    return wholeNumber;
}

playTheGameRPS = (guess) => {
    record("hit");
    let random = getRandomInt();
    if(guess === random){
        record("tie");
        showYouTie("tie", guess, random);
    }else if(guess === 1 && random === 2){
        record("lose");
        showYouLose("lose", guess, random);
    }else if(guess === 2 && random === 3){
        record("lose");
        showYouLose("lose", guess, random);
    }else if(guess === 3 && random === 1){
        record("lose");
        showYouLose("lose", guess, random);
    }else{
        record("won");
        showYouWon("won", guess, random);
    }
}

showYouWon = (res, guess, random) => {
    let text = `Congratulations!! You won`;
    let guess_img = getImage(guess);
    let random_img = getImage(random);
    let dialog = getDialog(res, text, guess_img, random_img);
    document.getElementById("output3").innerHTML = dialog;
}

showYouLose = (res, guess, random) => {
    let text = `Sorry!! You lost`;
    let guess_img = getImage(guess);
    let random_img = getImage(random);
    let dialog = getDialog(res, text, guess_img, random_img);
    document.getElementById("output3").innerHTML = dialog;
}

showYouTie = (res, guess, random) => {
    let text = `It's a tie dude!!`;
    let guess_img = getImage(guess);
    let random_img = getImage(random);
    let dialog = getDialog(res, text, guess_img, random_img);
    document.getElementById("output3").innerHTML = dialog;
}

let getImage = (number) => {
    switch(number){
        case 1:
            return `images/rock.jpg`;
        case 2:
            return `images/paper.jpg`;
        case 3:
            return `images/scissors.png`;
    }
}

getScore = () => {
    if(track["hit"] === 0){
        alert("Play the game first to get the score!!!");
    }else{
        let score = (track["won"] - track["lose"]);
        let effective_days = (track["hit"] - track["tie"]);
        let showScore;
        showScore = `
        <div class="main-show-res">
            <div class="res">
                <h3>Total number of times won: ${track["won"]}</h3>
            </div>
            <div class="res">
                <h3>Total number of times lost: ${track["lose"]}</h3>
            </div>
            <div class="res">
                <h3>Total number of ties: ${track["tie"]}</h3>
            </div>
            <div class="res">
                <h3>Total number of times played: ${track["hit"]}</h3>
            </div>
            <div class="res">

                <h3>Your final score is: ${score}/${effective_days}</h3>
            </div>
        </div>
        `
        document.getElementById("show-score").innerHTML = showScore;
    }
}

let getDialog = (dialogType, text, guess, random) => {
    let dialog;
    dialog = `<div class="game-res-container">`
    dialog += `<img src=${guess} class="res-img">`
    dialog += `<img src=${random} class="res-img">`
    dialog += "</div>";
    switch(dialogType){
        case "lose":
            dialog += `<div class='alert alert-danger' role='alert'>`;
            break;
        case "won":
            dialog += `<div class='alert alert-success' role='alert'>`;
            break;
        case "tie":
            dialog += `<div class='alert alert-warning' role='alert'>`;
            break;
    }
    dialog += text;
    dialog += "</div>";
    
    return dialog;
}

