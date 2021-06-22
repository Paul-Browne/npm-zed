import Z from "../../index.js";

window.Z = Z;

Z({
  id: "body",
  render: function () {
    document.querySelector(this.id).innerHTML = this.data
      .map((obj, i) => {
        return `
    	<div>
    		<h1>${obj.collected.metadata.name}</h1>
    		${
          obj.collected.metadata.author
            ? `<h3>${obj.collected.metadata.author.name}</h3>`
            : ""
        }
    		<p>${obj.collected.metadata.description}</p>
    	</div>
    	`;
      })
      .join("");
  },
});

function queryLocalstoreById(id) {
  var timestamp = localStorage.getItem(id + "-timestamp");
  var oneMonthInMilliseconds = 1000 * 60 * 60 * 24 * 30;
  if (!timestamp || Date.now() - timestamp > oneMonthInMilliseconds) {
    localStorage.setItem(id + "-timestamp", Date.now());
    return false;
  }
  return localStorage.getItem(id);
}

var frameworks = ["react", "angular", "zedjs"];
var requests = [];
frameworks.forEach((name) => {
  requests.push({
    url: "https://api.npms.io/v2/package/" + name,
    local: function () {
      return queryLocalstoreById(this.url);
    },
    callback: function (res) {
      localStorage.setItem(this.url, res);
      return JSON.parse(res);
    },
  });
});

Z.xhrs(requests, function (res) {
  Z.body.data = res;
  Z.body.render();
});

// Z.xhr({
//   url: "https://api.npms.io/v2/package/zedjs",
//   callback: function (res) {
//     Z.body.data = JSON.parse(res);
//     Z.body.render();
//   },
// });
