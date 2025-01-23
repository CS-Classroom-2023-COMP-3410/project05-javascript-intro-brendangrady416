/* script.js */
const clockElement = document.getElementById('clock');
const toggleFormatBtn = document.getElementById('toggle-format');
const colorInput = document.getElementById('color');
const fontSizeInput = document.getElementById('font-size');
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmBtn = document.getElementById('set-alarm');

let is24HourFormat = JSON.parse(localStorage.getItem('is24HourFormat')) || false;
let alarmTime = localStorage.getItem('alarmTime') || '';
let clockColor = localStorage.getItem('clockColor') || '#000000';
let clockFontSize = localStorage.getItem('clockFontSize') || '48';

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    if (!is24HourFormat) {
        hours = hours % 12 || 12;
    }
    
    clockElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    checkAlarm(hours, minutes);
}

function checkAlarm(hours, minutes) {
    if (alarmTime === `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`) {
        alert('Alarm ringing!');
    }
}

toggleFormatBtn.addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    localStorage.setItem('is24HourFormat', JSON.stringify(is24HourFormat));
});

colorInput.addEventListener('input', () => {
    clockElement.style.color = colorInput.value;
    localStorage.setItem('clockColor', colorInput.value);
});

fontSizeInput.addEventListener('input', () => {
    clockElement.style.fontSize = fontSizeInput.value + 'px';
    localStorage.setItem('clockFontSize', fontSizeInput.value);
});

setAlarmBtn.addEventListener('click', () => {
    alarmTime = alarmTimeInput.value;
    localStorage.setItem('alarmTime', alarmTime);
});

clockElement.style.color = clockColor;
clockElement.style.fontSize = clockFontSize + 'px';
colorInput.value = clockColor;
fontSizeInput.value = clockFontSize;

setInterval(updateClock, 1000);
updateClock();