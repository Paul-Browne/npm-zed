import Z from "../index.js";

window.addEventListener("hashchange", function (e) {
  Z.header.update(window.location.hash);
  Z.update("counter");
  Z.update("list");
  Z.update("person");
});

Z.mount({
  id: "body",
  render: () => {
    document.querySelector("body").innerHTML = `
      <header></header>
      <main></main>
      <footer></footer>
    `;
  },
});

Z.mount({
  id: "header",
  render: (state) => {
    document.querySelector("header").innerHTML = `
      <nav>
        <a class='${
          state.active === "#counter" ? "active" : ""
        }' href="#counter">counter</a>
        <a class='${
          state.active === "#list" ? "active" : ""
        }' href="#list">list</a>
        <a class='${
          state.active === "#person" ? "active" : ""
        }' href="#person">person</a>
      </nav>
    `;
  },
  state: {
    active: null,
    update: function (hash) {
      this.active = hash;
      Z.update("header");
    },
  },
});

Z.mount({
  id: "footer",
  render: () => {
    document.querySelector("footer").innerHTML = `
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    `;
  },
});

Z.mount({
  id: "counter",
  render: function (state) {
    if (window.location.hash !== "#counter") return;
    document.querySelector("main").innerHTML = `
      <br>
    	<button onclick="Z.counter.change(-1)">-1</button>
      <span>${state.count}</span>
      <button onclick="Z.counter.change(1)">+1</button>
    `;
  },
  state: {
    count: 0,
    change: function (number) {
      this.count += number;
      Z.update("counter");
    },
  },
});

Z.watch("counter", function (state) {
  console.log(state);
});

Z.mount({
  id: "list",
  render: function (state) {
    if (window.location.hash !== "#list") return;
    const html = `
      <br>
      <input id="task" type="text" placeholder="add task" />
      <button onclick=Z.list.add()>Add</button>
      <br>
      ${state.todos
        .map(function (todo, index) {
          return `
            <div>
              <span>${todo}</span>
              <button onclick="Z.list.remove(${index})">remove</button>
            </div>
          `;
        })
        .join("")}
      `;
    document.querySelector("main").innerHTML = html;
  },
  state: {
    todos: [],
    add: function () {
      var task = document.getElementById("task");
      this.todos.push(task.value);
      Z.update("list");
      document.getElementById("task").focus();
    },
    remove: function (index) {
      this.todos.splice(index, 1);
      Z.update("list");
    },
  },
});

Z.load(
  [
    {
      id: "data",
      url: "data.json",
      callback: function (res) {
        return JSON.parse(res);
      },
    },
  ],
  function (data) {
    Z.mount({
      id: "person",
      render: function (state) {
        if (window.location.hash !== "#person") return;
        document.querySelector(
          "main"
        ).innerHTML = `<h1>Hello ${state.name} you are ${state.age} years old!</h1>`;
      },
      state: data[0],
    });
  }
);
