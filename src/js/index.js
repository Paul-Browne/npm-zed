import Z from "../../index.js";
import { head, body, header, footer } from "./private/components";

head({
  title: "NASA &middot; Homepage",
});

body({
  class: "home",
});

header();

Z.mount({
  render: () => {
    document.getElementById("main").innerHTML = `
      <img class="logo" src="/images/nasa-logo.png">
      <h1>Welcome to NASA</h1>
      <h2>The National Aeronautics and Space Administration</h2>
      <section class="cards">
        <a href="/closest" class="card" >
          <img src="/images/near-earth-asteroid.jpeg">
          <h3>All the latest close to earth asteroid data from 6 years ago</h3>
        </a>
        <a href="/biggest" class="card">
          <img src="/images/biggest-asteroid.jpeg">
          <h3>The Month's biggest near Earth asteroids from 2017 to 2019</h3>
        </a>
      </section>
    `;
  },
});

footer();
