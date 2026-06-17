const targetDateInput = document.getElementById("targetDate");
const saveButton = document.getElementById("saveButton");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const totalHoursElement = document.getElementById("totalHours");
const totalMinutesElement = document.getElementById("totalMinutes");
const totalSecondsElement = document.getElementById("totalSeconds");

const selectedDateElement = document.getElementById("selectedDate");
const messageElement = document.getElementById("message");

let targetDate = localStorage.getItem("targetDate");

function saveTargetDate() {
  const selectedValue = targetDateInput.value;

  if (!selectedValue) {
    messageElement.textContent = "Escolha uma data e horário primeiro.";
    return;
  }

  const selectedDate = new Date(selectedValue);
  const now = new Date();

  if (selectedDate <= now) {
    messageElement.textContent = "Escolha uma data no futuro.";
    return;
  }

  targetDate = selectedDate.toISOString();
  localStorage.setItem("targetDate", targetDate);

  messageElement.textContent = "";
  updateCounter();
}

function updateCounter() {
  if (!targetDate) {
    return;
  }

  const now = new Date();
  const finalDate = new Date(targetDate);
  const difference = finalDate - now;

  selectedDateElement.textContent = formatDate(finalDate);

  if (difference <= 0) {
    resetCounter();
    messageElement.textContent = "Chegou o dia de se ver!";
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
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;

  totalHoursElement.textContent = totalHours.toLocaleString("pt-BR");
  totalMinutesElement.textContent = totalMinutes.toLocaleString("pt-BR");
  totalSecondsElement.textContent = totalSeconds.toLocaleString("pt-BR");

  messageElement.textContent = getDynamicMessage(days, hours, minutes);
}

function resetCounter() {
  daysElement.textContent = "0";
  hoursElement.textContent = "0";
  minutesElement.textContent = "0";
  secondsElement.textContent = "0";

  totalHoursElement.textContent = "0";
  totalMinutesElement.textContent = "0";
  totalSecondsElement.textContent = "0";
}

function formatDate(date) {
  return date.toLocaleString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getDynamicMessage(days, hours, minutes) {
  if (days === 0 && hours === 0 && minutes < 60) {
    return "Está chegando!";
  }

  if (days === 0) {
    return "É hoje!";
  }

  if (days === 1) {
    return "É amanhã!";
  }

}

saveButton.addEventListener("click", saveTargetDate);

updateCounter();
setInterval(updateCounter, 1000);