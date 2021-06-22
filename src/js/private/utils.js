const nasaRootUrl =
  "https://api.nasa.gov/neo/rest/v1/feed?api_key=yo8sBiXIkrfsPQYtovghFK3ysIUiVjJ16ncO7ts7&detailed=true&";
const proxyRootUrl = "//localhost:8900/api?";
const closetQueryString = "start_date=2015-12-19&end_date=2015-12-26";

export const nasaEndpoint = nasaRootUrl + closetQueryString;
export const proxyNasaEndpoint = proxyRootUrl + closetQueryString;

export const queryLocalstoreById = (id) => {
  const timestamp = localStorage.getItem(id + "-timestamp");
  const oneMonthInMilliseconds = 1000 * 60 * 60 * 24 * 30;
  if (!timestamp || Date.now() - timestamp > oneMonthInMilliseconds) {
    localStorage.setItem(id + "-timestamp", Date.now());
    return false;
  }
  return localStorage.getItem(id);
};

export const endpointsForMonth = (month, year) => {
  // get Days in given month and year
  const days = new Date(year, month, 0).getDate();

  let sevenDayRangeObjects = [];

  for (let i = 0; i < days; i++) {
    if (i % 7 === 0) {
      sevenDayRangeObjects.push({
        start: i + 1,
        end: i + 7 < days ? i + 7 : days,
      });
    }
  }

  return sevenDayRangeObjects.map((obj) => {
    return `${nasaRootUrl}start_date=${year}-${month}-${obj.start}&end_date=${year}-${month}-${obj.end}`;
  });
};

export const paginationCalculation = (current, start, end) => {
  const halfWayToStart = start + Math.floor((current - start) / 2);
  const halfWayToEnd = end - Math.floor((end - current) / 2);
  return [
    {
      value: start,
      target: start,
      disabled: current === start ? true : false,
    },
    {
      value: halfWayToStart <= start ? "…" : halfWayToStart,
      target: halfWayToStart,
      disabled: halfWayToStart <= start ? true : false,
    },
    {
      value: "previous",
      target: current === start ? current : current - 1,
      disabled: current === start ? true : false,
    },
    {
      value: "next",
      target: current === end ? current : current + 1,
      disabled: current === end ? true : false,
    },
    {
      value: halfWayToEnd >= end ? "…" : halfWayToEnd,
      target: halfWayToEnd,
      disabled: halfWayToEnd >= end ? true : false,
    },
    {
      value: end,
      target: end,
      disabled: current === end ? true : false,
    },
  ];
};

export const jsonToList = (value, opts) => {
  const type = typeof value;
  if (type === "string" || type === "number" || type === "boolean") {
    if (type === "string" && value.indexOf("http") === 0) {
      return `: <a href="${value}">${value}</a>`;
    }
    return `: <b>${value}</b>`;
  } else if (typeof value === "object") {
    if (!Array.isArray(value)) {
      return Object.keys(value)
        .map((key) => {
          return `
            <ul>
                <li>
                    ${key.replace(/_/g, " ")}${jsonToList(value[key])}
                </li>
            </ul>
          `;
        })
        .join("");
    } else {
      return value
        .map((element) => {
          return jsonToList(element);
        })
        .join("");
    }
  }
};

export const orderAsteroidsByDistanceFromEarth = (data) => {
  let restructuredArrayOfAsteroids = [];
  Object.keys(data.near_earth_objects).forEach((date) => {
    data.near_earth_objects[date].forEach((asteroid) => {
      restructuredArrayOfAsteroids.push(asteroid);
    });
  });
  return restructuredArrayOfAsteroids.sort((a, b) => {
    return (
      a.close_approach_data[0].miss_distance.kilometers -
      b.close_approach_data[0].miss_distance.kilometers
    );
  });
};

export const orderOneMonthsAsteroidsByDiameter = (data) => {
  let restructuredArrayOfAsteroids = [];
  data.forEach((week) => {
    Object.keys(week.near_earth_objects).forEach((date) => {
      week.near_earth_objects[date].forEach((asteroid) => {
        restructuredArrayOfAsteroids.push(asteroid);
      });
    });
  });
  return restructuredArrayOfAsteroids.sort((a, b) => {
    return (
      b.estimated_diameter.meters.estimated_diameter_max -
      a.estimated_diameter.meters.estimated_diameter_max
    );
  });
};
