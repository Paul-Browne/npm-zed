import Z from "../../index.js";
import { head, body, header, footer, pagination } from "./private/components";
import {
  nasaEndpoint,
  proxyNasaEndpoint,
  jsonToList,
  orderAsteroidsByDistanceFromEarth,
  queryLocalstoreById,
} from "./private/utils.js";

head({
  title: "NASA &middot; Closest Asteroids",
});

body({
  class: "closest",
});

Z.mount({
  id: "container",
  render: () => {
    document.getElementById("main").innerHTML = `
      <section id="asteroid-data">
        <code>Loading...</code>
      </section>
      <div id="pagination"></div>
    `;
  },
});

header();

footer();

Z.load(
  [
    {
      id: "req_2015_12_3",
      url: nasaEndpoint,
      local: () => {
        return queryLocalstoreById("req_2015_12_3");
      },
      callback: (data) => {
        localStorage.setItem("req_2015_12_3", data);
        return orderAsteroidsByDistanceFromEarth(JSON.parse(data));
      },
    },
  ],
  (mainData) => {
    Z.mount({
      id: "main",
      render: (state) => {
        const asteroid = state.data[state.index];
        document.getElementById("asteroid-data").innerHTML = `
          <h1>${state.index + 1}: ${asteroid.name}</h1>
          <div>
            ${jsonToList(asteroid)}
          </div>
        `;
      },
      state: {
        index: 0,
        data: mainData[0],
      },
    });
    pagination(mainData[0].length, 0);
    Z.title = mainData[0][0].name;
    Z.update("title");
  }
);
