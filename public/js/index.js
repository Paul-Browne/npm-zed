!function(){"use strict";Z.xhr=function(e,n,t,a){n=n||[];var o=new XMLHttpRequest;for(var s in o.onreadystatechange=function(){4==o.readyState&&(n[t||0]=o.status==(e.status||200)?e.callback?e.callback(o.responseText):o.responseText:void 0,a&&!~n.indexOf(null)&&a(n))},o.open(e.method||"GET",e.url,!0),e.headers)o.setRequestHeader(s,e.headers[s]);o.send(e.body)},Z.xhrs=function(e,n){var t=[];e.forEach((function(e,n){t[n]=null})),e.forEach((function(e,a){var o=e.local&&e.local();o?(t[a]=e.callback?e.callback(o):o,n&&!~t.indexOf(null)&&n(t)):Z.xhr(e,t,a,n)}))};var e;e={title:"NASA &middot; Homepage"},Z.mount({id:"head",render:function(){document.getElementsByTagName("head")[0].innerHTML='\n      <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n      <link rel="stylesheet" type="text/css" href="/css/style.css" />\n      <title></title>\n      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">\n      <link rel="manifest" href="/site.webmanifest">\n      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#007ef8">\n      <meta name="msapplication-TileColor" content="#f7f6f5">\n      <meta name="theme-color" content="#f7f6f5">        \n    '}}),Z.mount({id:"title",render:function(e){document.getElementsByTagName("title")[0].innerHTML=e},state:e.title}),function(e){Z.mount({id:"body",render:function(e){document.getElementsByTagName("body")[0].innerHTML='\n      <header id="header"></header>\n      <main id="main" class="'.concat(e,'"></main>\n      <footer id="footer"></footer>\n    ')},state:e.class})}({class:"home"}),Z.mount({id:"header",render:function(){document.getElementById("header").innerHTML='\n        <nav>\n          <a href="/" >\n            <img src="/images/nasa-logo.png" alt="nasa logo" />\n          </a>\n          <input id="menu" type="checkbox" />\n          <label for="menu"></label>\n          <ul>\n            <li>\n                <a href="/closest" >closest</a>\n            </li>\n            <li>\n                <a href="/biggest" >biggest</a>\n            </li>        \n          </ul>\n        </nav>\n      '}}),function(e){Z[e.id]=e}.mount({render:function(){document.getElementById("main").innerHTML='\n      <img class="logo" src="/images/nasa-logo.png">\n      <h1>Welcome to NASA</h1>\n      <h2>The National Aeronautics and Space Administration</h2>\n      <section class="cards">\n        <a href="/closest" class="card" >\n          <img src="/images/near-earth-asteroid.jpeg">\n          <h3>All the latest close to earth asteroid data from 6 years ago</h3>\n        </a>\n        <a href="/biggest" class="card">\n          <img src="/images/biggest-asteroid.jpeg">\n          <h3>The Month\'s biggest near Earth asteroids from 2017 to 2019</h3>\n        </a>\n      </section>\n    '}}),Z.mount({id:"footer",render:function(){document.getElementById("footer").innerHTML='<p>In case you haven\'t already guessed; This is not the real NASA. It\'s not even the real NASA logo, I used <a href="https://dribbble.com/shots/10741319-NASA">this excellent</a> concept. This is just a website created to complete an assignment. If you are interested in the code. You can check it out <a href="https://github.com/Paul-Browne/nasa-assignment">here at github</a> Also I apologize if you had to wait 15 seconds to see the data for the closest and biggest asteroids. This is because the <a href="https://api.nasa.gov">NASA API</a> takes ages. &copy; Paul Browne 2021</p>'}})}();
//# sourceMappingURL=index.js.map
