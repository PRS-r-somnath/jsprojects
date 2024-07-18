let startTime;
let timer;
const textToType = document.getElementById('text-to-type').innerText;
const inputArea = document.getElementById('input-area');
const timeDisplay = document.getElementById('time');
const speedDisplay = document.getElementById('speed');

function startTest() {
    const inputText = inputArea.value;
    if (inputText.length === 1 && !startTime) {
        startTime = new Date().getTime();
        timer = setInterval(updateTime, 1000);
    }

    if (inputText === textToType) {
        clearInterval(timer);
        calculateSpeed();
        inputArea.disabled = true;
    }
}

function updateTime() {
    const currentTime = new Date().getTime();
    const timeSpent = Math.floor((currentTime - startTime) / 1000);
    timeDisplay.innerText = timeSpent;
}

function calculateSpeed() {
    const endTime = new Date().getTime();
    const timeSpent = (endTime - startTime) / 1000;
    const wordCount = textToType.split(' ').length;
    const speed = Math.floor((wordCount / timeSpent) * 60);
    speedDisplay.innerText = speed;
}

function resetTest() {
    clearInterval(timer);
    inputArea.value = '';
    inputArea.disabled = false;
    timeDisplay.innerText = '0';
    speedDisplay.innerText = '0';
    startTime = null;
}
inputArea.addEventListener('input', startTest);
