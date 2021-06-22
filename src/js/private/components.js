import { paginationCalculation } from "./utils.js";

export const head = (obj) => {
  Z.mount({
    id: "head",
    render: () => {
      document.getElementsByTagName("head")[0].innerHTML = `
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" type="text/css" href="/css/style.css" />
      <title></title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/site.webmanifest">
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#007ef8">
      <meta name="msapplication-TileColor" content="#f7f6f5">
      <meta name="theme-color" content="#f7f6f5">        
    `;
    },
  });

  Z.mount({
    id: "title",
    render: (state) => {
      document.getElementsByTagName("title")[0].innerHTML = state;
    },
    state: obj.title,
  });
};

export const body = (obj) =>
  Z.mount({
    id: "body",
    render: (state) => {
      document.getElementsByTagName("body")[0].innerHTML = `
      <header id="header"></header>
      <main id="main" class="${state}"></main>
      <footer id="footer"></footer>
    `;
    },
    state: obj.class,
  });

export const header = () =>
  Z.mount({
    id: "header",
    render: () => {
      document.getElementById("header").innerHTML = `
        <nav>
          <a href="/" >
            <img src="/images/nasa-logo.png" alt="nasa logo" />
          </a>
          <input id="menu" type="checkbox" />
          <label for="menu"></label>
          <ul>
            <li>
                <a href="/closest" >closest</a>
            </li>
            <li>
                <a href="/biggest" >biggest</a>
            </li>        
          </ul>
        </nav>
      `;
    },
  });

export const footer = () =>
  Z.mount({
    id: "footer",
    render: () => {
      document.getElementById(
        "footer"
      ).innerHTML = `<p>In case you haven't already guessed; This is not the real NASA. It's not even the real NASA logo, I used <a href="https://dribbble.com/shots/10741319-NASA">this excellent</a> concept. This is just a website created to complete an assignment. If you are interested in the code. You can check it out <a href="https://github.com/Paul-Browne/nasa-assignment">here at github</a> Also I apologize if you had to wait 15 seconds to see the data for the closest and biggest asteroids. This is because the <a href="https://api.nasa.gov">NASA API</a> takes ages. &copy; Paul Browne 2021</p>`;
    },
  });

export const pagination = (length, index) =>
  Z.mount({
    id: "pagination",
    render: (state) => {
      const arr = paginationCalculation(state.index + 1, 1, state.length);
      document.getElementById("pagination").innerHTML = `
        <nav class="pagination">
          ${arr
            .map((el) => {
              return `          
                  <button onclick="Z.pagination.moveToN(${el.target - 1})" ${
                el.disabled ? "disabled" : ""
              } class="pagination-button">${el.value}</button>
              `;
            })
            .join("")}
        </nav>
      `;
    },
    state: {
      index: index,
      length: length,
      moveToN: function (index) {
        if (index == this.index) return;
        Z.main.index = index;
        Z.pagination.index = index;
        Z.title = Z.main.data[index].name;

        Z.update("main");
        Z.update("pagination");
        Z.update("title");
      },
    },
  });
