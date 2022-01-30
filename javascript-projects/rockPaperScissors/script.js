const userScore = document.getElementsByClassName('result-score')[0];
const cpuScore = document.getElementsByClassName('result-score')[1];
const matchHistory = document.getElementsByClassName('matchHistory')[0];

const SIGNS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌️',
        beats: 'paper'
    },
];
const playRound = (selectedSign) => {
    const userSign = SIGNS[selectedSign];
    const cpuSign = SIGNS[Math.floor(Math.random() * SIGNS.length)];
    userWon = isWinner(userSign, cpuSign);
    cpuWon = isWinner(cpuSign, userSign);
    if(userWon){
        userScore.innerHTML = parseInt(userScore.innerHTML) + 1;
    }
    else if(cpuWon){
        cpuScore.innerHTML = parseInt(cpuScore.innerHTML) + 1;
    }
    updateHistory(userSign,cpuSign);
}

const isWinner = (firstSelection,secondSelection) => {
    if(firstSelection.beats === secondSelection.name)
        return true;
    return false;
}

const updateHistory = (userSign, cpuSign) => {
    const userDiv = document.createElement('div');
    const cpuDiv = document.createElement('div');
    userDiv.innerText =  userSign.emoji;
    cpuDiv.innerText = cpuSign.emoji;
    if(isWinner(userSign, cpuSign))
        userDiv.classList.add('winner');
    if(isWinner(cpuSign, userSign))
        cpuDiv.classList.add('winner');
    matchHistory.prepend(cpuDiv);
    matchHistory.prepend(userDiv);
}