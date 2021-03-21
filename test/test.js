import Z from "../index.js";

Z.mount({
  id: "body",
  render: function (state) {
    return `
    	<h1>Hello ${state.name}, aged ${state.age}!</h1>
    	<button onclick="Z.body.rename('batman')">update</button>
    	<button onclick="Z.body.reage(1)">+1</button>
    	<button onclick="Z.body.reage(-1)">-1</button>
    `;
  },
  inner: document.getElementsByTagName("body")[0],
  state: {
    name: "Paul",
    age: 20,
    rename: function (name) {
      if (this.name !== name) {
        this.name = name;
        Z.update("body");
      }
    },
    reage: function (number) {
      this.age = this.age + number;
      Z.update("body");
    },
  },
});

Z.watch("body", function (state) {
  console.log(state);
});
