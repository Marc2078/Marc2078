const departures = [
  {
    lineCode: "r1",
    lineLabel: "R1",
    service: "2301",
    platform: "7 - 8",
    destination: "Mataró",
    travelMinutes: 42,
    stops: ["Arc de Triomf", "El Clot-Aragó", "Badalona", "Premià de Mar", "Mataró"]
  },
  {
    lineCode: "r2",
    lineLabel: "R2 Nord",
    service: "4109",
    platform: "9 - 10",
    destination: "Aeroport",
    travelMinutes: 36,
    stops: ["Passeig de Gràcia", "Sants", "Bellvitge", "El Prat de Llobregat", "Aeroport"]
  },
  {
    lineCode: "r2s",
    lineLabel: "R2 Sud",
    service: "2512",
    platform: "11 - 12",
    destination: "Sant Vicenç de Calders",
    travelMinutes: 68,
    stops: ["Bellvitge", "Gavà", "Castelldefels", "Sitges", "Vilanova i la Geltrú", "Sant Vicenç de Calders"]
  },
  {
    lineCode: "r4",
    lineLabel: "R4",
    service: "4417",
    platform: "13 - 14",
    destination: "Terrassa Estació del Nord",
    travelMinutes: 50,
    stops: ["Plaça Catalunya", "Arc de Triomf", "Sabadell Sud", "Sabadell Centre", "Terrassa Estació del Nord"]
  },
  {
    lineCode: "r4",
    lineLabel: "R4",
    service: "4423",
    platform: "13 - 14",
    destination: "Manresa",
    travelMinutes: 78,
    stops: ["Plaça Catalunya", "Montcada Bifurcació", "Sabadell Nord", "Terrassa", "Manresa"]
  },
  {
    lineCode: "r2",
    lineLabel: "R2",
    service: "4226",
    platform: "9 - 10",
    destination: "Sant Celoni",
    travelMinutes: 62,
    stops: ["Passeig de Gràcia", "El Clot-Aragó", "Granollers Centre", "Cardedeu", "Sant Celoni"]
  },
  {
    lineCode: "r1",
    lineLabel: "R1",
    service: "2331",
    platform: "7 - 8",
    destination: "L'Hospitalet de Llobregat",
    travelMinutes: 30,
    stops: ["Estació de França", "Arc de Triomf", "Plaça Catalunya", "Sants", "L'Hospitalet de Llobregat"]
  }
];

const template = document.getElementById("departure-row-template");
const departuresList = document.getElementById("departures-list");
const clockNode = document.getElementById("clock");

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function formatTime(date) {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function buildRows() {
  const now = new Date();
  const start = addMinutes(now, 4);

  departuresList.innerHTML = "";

  departures.forEach((departure, index) => {
    const node = template.content.cloneNode(true);
    const row = node.querySelector(".departure-row");
    const departureDate = addMinutes(start, index * 5);

    const totalSegments = Math.max(1, departure.stops.length - 1);
    const minutesPerSegment = Math.floor(departure.travelMinutes / totalSegments);

    const stationTimes = departure.stops.map((stop, stopIndex) => ({
      name: stop,
      at: addMinutes(departureDate, stopIndex * minutesPerSegment)
    }));

    row.dataset.departureTimestamp = String(departureDate.getTime());
    row.dataset.stationTimes = JSON.stringify(
      stationTimes.map((station) => ({
        name: station.name,
        at: station.at.getTime()
      }))
    );

    row.querySelector(".time").textContent = formatTime(departureDate);
    row.querySelector(".destination").textContent = departure.destination;
    row.querySelector(".stops").textContent = departure.stops.join(" · ");

    const linePill = row.querySelector(".line-pill");
    linePill.textContent = departure.lineLabel;
    linePill.classList.add(`line-${departure.lineCode}`);

    row.querySelector(".service").textContent = departure.service;
    row.querySelector(".platform").textContent = departure.platform;

    departuresList.appendChild(node);
  });
}

function getCurrentStationStatus(now, stationTimesRaw, destination) {
  const stationTimes = stationTimesRaw
    .map((station) => ({ ...station, atDate: new Date(Number(station.at)) }))
    .sort((a, b) => a.atDate - b.atDate);

  const first = stationTimes[0];
  const last = stationTimes[stationTimes.length - 1];

  if (now < first.atDate) {
    return `Pendiente de salida · próxima parada ${first.name}`;
  }

  if (now >= last.atDate) {
    return `Llegado a destino · ${destination}`;
  }

  for (let i = 0; i < stationTimes.length - 1; i += 1) {
    const current = stationTimes[i];
    const next = stationTimes[i + 1];

    if (now >= current.atDate && now < next.atDate) {
      const progress = (now.getTime() - current.atDate.getTime()) / (next.atDate.getTime() - current.atDate.getTime());
      const percent = Math.max(0, Math.min(100, Math.round(progress * 100)));
      return `En ruta: ${current.name} → ${next.name} (${percent}%)`;
    }
  }

  return "Actualizando recorrido...";
}

function updateClockAndRows() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  if (clockNode) {
    clockNode.textContent = `${hh}:${mm}:${ss}`;
  }

  document.querySelectorAll(".departure-row").forEach((row) => {
    const departureTimestamp = Number(row.dataset.departureTimestamp);
    const minutesLeft = Math.ceil((departureTimestamp - now.getTime()) / 60000);
    const countdown = row.querySelector(".countdown");

    if (minutesLeft > 0) {
      countdown.textContent = `en ${minutesLeft} min`;
    } else if (minutesLeft === 0) {
      countdown.textContent = "saliendo ahora";
    } else {
      countdown.textContent = `hace ${Math.abs(minutesLeft)} min`;
    }

    const stationTimes = JSON.parse(row.dataset.stationTimes || "[]");
    const destination = row.querySelector(".destination")?.textContent || "destino";
    const status = row.querySelector(".status");

    status.textContent = getCurrentStationStatus(now, stationTimes, destination);
  });
}

buildRows();
updateClockAndRows();
setInterval(updateClockAndRows, 1000);
setInterval(buildRows, 60000);
