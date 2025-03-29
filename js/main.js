const LOCATION_URL = "http://ip-api.com/json/24.48.0.1";

const formatter = new Intl.DateTimeFormat(navigator.language, {
  hour: "numeric",
  minute: "numeric",
  timeZoneName: "short",
});

let intervalID = setInterval(getDate, 10000);
getLocationDataUser();
getDate();

function getLocationDataUser() {
  fetch(LOCATION_URL)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("ERROR: ", error.message));
}

function getDate() {
  const {
    hour: [hour],
    minute: [minute],
    timeZoneName: [timeZone],
  } = Object.groupBy(formatter.formatToParts(new Date()), (part) => part.type);
  const dateElement = document.querySelector("#hour");
  updateTitle(hour.value);
  dateElement.textContent = `${hour.value}:${minute.value}`;
}

function updateTitle(hour) {
  const titleToUpdate = getTitleFromHour(hour);
  const titleElement = document.querySelector("#title");
  titleElement.textContent = titleToUpdate;
  console.log(titleToUpdate);
}

function getTitleFromHour(hour) {
  console.log(hour);
  if (hour > 5 && hour <= 12) {
    return "Buenos días!";
  }
  if (hour >= 13 && hour <= 20) {
    return "Buenas tardes!";
  }
  return "Buenas noches!";
}
