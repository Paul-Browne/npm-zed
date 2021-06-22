import Z from "../../index.js";
import { head, body, header, footer, pagination } from "./private/components";

import {
  jsonToList,
  orderOneMonthsAsteroidsByDiameter,
  endpointsForMonth,
  queryLocalstoreById,
} from "./private/utils.js";

head({
  title: "NASA &middot; Biggest Asteroids",
});

body({
  class: "biggest",
});

Z.mount({
  id: "container",
  render: () => {
    document.getElementById("main").innerHTML = `
      <section id="date-picker"></section>
      <section id="asteroid-data"></section>
      <div id="pagination"></div>
    `;
  },
});

header();

footer();

const arrayOfrequests = (month, year) => {
  return endpointsForMonth(month, year).map((req, i) => {
    const id = "req_" + year + "_" + month + "_" + (i + 1);
    return {
      id: id,
      url: req,
      local: () => {
        return queryLocalstoreById(id);
      },
      callback: (data) => {
        localStorage.setItem(id, data);
        return JSON.parse(data);
      },
    };
  });
};

Z.mount({
  id: "picker",
  render: () => {
    document.getElementById("date-picker").innerHTML = `
      <select onchange="Z.picker.year(this.value)">
          <option value='2017'>2017</option>
          <option value='2018'>2018</option>
          <option value='2019'>2019</option>
      </select>    
      <select onchange="Z.picker.month(this.value)">
          <option value='1'>Janaury</option>
          <option value='2'>February</option>
          <option value='3'>March</option>
          <option value='4'>April</option>
          <option value='5'>May</option>
          <option value='6'>June</option>
          <option value='7'>July</option>
          <option value='8'>August</option>
          <option value='9'>September</option>
          <option value='10'>October</option>
          <option value='11'>November</option>
          <option value='12'>December</option>
      </select>
      <div id="info"><h3>Please select a Year and a Month</h3></div>
    `;
  },
  state: {
    selectedYear: null,
    selectedMonth: null,
    year: function (value) {
      if (this.selectedYear === value) return;
      this.selectedYear = value;
      this.validate();
    },
    month: function (value) {
      if (this.selectedMonth === value) return;
      this.selectedMonth = value;
      this.validate();
    },
    validate: function () {
      if (this.selectedMonth && this.selectedYear) {
        Z.mount({
          id: "info",
          render: () => {
            document.getElementById("info").innerHTML = `
              <h3>Loading... please wait...</h3>
              <small>Probably a loooong time</small>
            `;
          },
        });
        Z.load(
          arrayOfrequests(
            Number(this.selectedMonth),
            Number(this.selectedYear)
          ),
          (data) => {
            const orderedData = orderOneMonthsAsteroidsByDiameter(data);

            console.log(orderedData);

            Z.mount({
              id: "main",
              render: (state) => {
                console.log(state);

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
                data: orderedData,
              },
            });

            pagination(orderedData.length, 0);

            Z.title = orderedData[0].name;
            Z.update("title");
          }
        );
      } else if (this.selectedMonth) {
        Z.mount({
          render: () => {
            document.getElementById("info").innerHTML = `
              <h3>Please select a Year</h3>
            `;
          },
        });
      } else if (this.selectedYear) {
        Z.mount({
          render: () => {
            document.getElementById("info").innerHTML = `
              <h3>Please select a Month</h3>
            `;
          },
        });
      }
    },
  },
});
