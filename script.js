const countdownForm = document.getElementById("countdownForm");
const targetDateInput = document.getElementById("targetDate");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const totalHoursElement = document.getElementById("totalHours");
const totalMinutesElement = document.getElementById("totalMinutes");
const totalSecondsElement = document.getElementById("totalSeconds");

const messageElement = document.getElementById("message");

let targetDate = localStorage.getItem("targetDate");

function saveTargetDate(event) {
  event.preventDefault();

  const selectedValue = targetDateInput.value;

  if (!selectedValue) {
    messageElement.textContent = "Escolha uma data e horário.";
    return;
  }

  const selectedDate = new Date(selectedValue);
  const now = new Date();

  if (selectedDate <= now) {
    messageElement.textContent = "Escolha uma data futura.";
    return;
  }

  targetDate = selectedDate.toISOString();
  localStorage.setItem("targetDate", targetDate);

  messageElement.textContent = "";
  updateCounter();
}

function updateCounter() {
  if (!targetDate) {
    resetCounter();
    return;
  }

  const now = new Date();
  const finalDate = new Date(targetDate);
  const difference = finalDate - now;

  if (difference <= 0) {
    resetCounter();
    messageElement.textContent = "O horário chegou.";
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalSeconds / 3600);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysElement.textContent = days;
  hoursElement.textContent = formatNumber(hours);
  minutesElement.textContent = formatNumber(minutes);
  secondsElement.textContent = formatNumber(seconds);

  totalHoursElement.textContent = totalHours.toLocaleString("pt-BR");
  totalMinutesElement.textContent = totalMinutes.toLocaleString("pt-BR");
  totalSecondsElement.textContent = totalSeconds.toLocaleString("pt-BR");
}

function resetCounter() {
  daysElement.textContent = "0";
  hoursElement.textContent = "00";
  minutesElement.textContent = "00";
  secondsElement.textContent = "00";

  totalHoursElement.textContent = "0";
  totalMinutesElement.textContent = "0";
  totalSecondsElement.textContent = "0";
}

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

countdownForm.addEventListener("submit", saveTargetDate);

updateCounter();
setInterval(updateCounter, 1000);