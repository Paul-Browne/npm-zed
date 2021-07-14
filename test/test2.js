import Z from "../index.js";

function queryLocalstoreById(id) {
  var timestamp = localStorage.getItem(id + "-timestamp");
  var oneMonthInMilliseconds = 1000 * 60 * 60 * 24 * 30;
  if (!timestamp || Date.now() - timestamp > oneMonthInMilliseconds) {
    localStorage.setItem(id + "-timestamp", Date.now());
    return false;
  }
  return localStorage.getItem(id);
}

var str = "abcdef";
var requests = [
  {
    url: "https://ewrwerewedcejnvihnvirnv.com",
    local: function () {
      console.log("ran local");
      return queryLocalstoreById(this.url);
    },
    callback: function (res) {
      console.log("ran callback");
      localStorage.setItem(this.url, res);
      return JSON.parse(res);
    },
  },
];
for (var j = 0; j < str.length; j++) {
  for (var k = 0; k < str.length; k++) {
    requests.push({
      url: "https://api.npms.io/v2/package/" + str[j] + str[k],
      local: function () {
        console.log("ran local");
        return queryLocalstoreById(this.url);
      },
      callback: function (res) {
        console.log("ran callback");
        localStorage.setItem(this.url, res);
        return JSON.parse(res);
      },
    });
  }
}

Z.xhrs(requests, function (res) {
  console.log(res);
});

Z.xhr({
  url: "https://api.npms.io/v2/package/ab",
  local: function () {
    return queryLocalstoreById(this.url);
  },
  callback: function (res) {
    localStorage.setItem(this.url, res);
    Z({
      id: "body",
      render: function () {
        document.querySelector(this.id).innerHTML = `
          <h1 id="heading"></h1><br><br>
          <h1>${this.name}</h1> is <h3>${this.age}</h3> years old!
          ${
            this.data
              ? `
            <code>${this.data.analyzedAt}</code>
            <code>${this.data.score.final}</code>
          `
              : ""
          }`;
      },
      data: JSON.parse(res),
      name: "Paul",
      age: 38,
    });
    Z.body.render();
  },
});

// Z.xhrs(requests, function(res){
//     console.log(res);
//   }
// )
// Z({
//   id: "body",
//   render: function() {
//     document.querySelector(this.id).innerHTML = `
//       <h1 id="heading"></h1><br><br>
//       <h1>${this.name}</h1> is <h3>${this.age}</h3> years old!
//       ${this.data ? `
//         <code>${this.data.analyzedAt}</code>
//         <code>${this.data.score.final}</code>
//       `
//       :
//       ""
//     }`;
//   },
//   name: "Paul",
//   age: 38
// });
// Z({
//   id: "heading",
//   render: function(){
//     document.querySelector("#heading").innerHTML = this.title;
//   },
//   title: "HELLO!!!"
// })
// Z.xhr({
//   url: "https://api.npms.io/v2/package/zedjs",
//   callback: function(res){
//     Z.body.data = JSON.parse(res);
//     Z.body.render();
//     Z.heading.render();
//     console.log(JSON.parse(res));
//   }
// })
