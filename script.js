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

  if (difference === 0) {
    resetCounter();
    messageElement.textContent = "O horário é agora.";
    return;
  }

  const elapsedMilliseconds = Math.abs(difference);
  const duration = getDuration(elapsedMilliseconds);

  updateDisplay(duration);

  if (difference < 0) {
    messageElement.textContent = `Faz ${formatDuration(duration)} desde a data selecionada.`;
    return;
  }

  messageElement.textContent = "";
}

function getDuration(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalSeconds / 3600);

  return {
    totalSeconds,
    totalMinutes,
    totalHours,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function updateDisplay(duration) {
  daysElement.textContent = duration.days;
  hoursElement.textContent = formatNumber(duration.hours);
  minutesElement.textContent = formatNumber(duration.minutes);
  secondsElement.textContent = formatNumber(duration.seconds);

  totalHoursElement.textContent = duration.totalHours.toLocaleString("pt-BR");
  totalMinutesElement.textContent = duration.totalMinutes.toLocaleString("pt-BR");
  totalSecondsElement.textContent = duration.totalSeconds.toLocaleString("pt-BR");
}

function formatDuration(duration) {
  const parts = [];

  if (duration.days > 0) {
    parts.push(`${duration.days} ${duration.days === 1 ? "dia" : "dias"}`);
  }

  if (duration.hours > 0) {
    parts.push(`${duration.hours} ${duration.hours === 1 ? "hora" : "horas"}`);
  }

  if (duration.minutes > 0) {
    parts.push(`${duration.minutes} ${duration.minutes === 1 ? "minuto" : "minutos"}`);
  }

  if (duration.seconds > 0 || parts.length === 0) {
    parts.push(`${duration.seconds} ${duration.seconds === 1 ? "segundo" : "segundos"}`);
  }

  return parts.join(", ");
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
