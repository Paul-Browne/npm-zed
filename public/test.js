!function(){"use strict";var n={},t=window,e=t.Z={load:function(n,e){var a=[];n.forEach((function(n,t){a[t]=null})),n.forEach((function(n,o){var c=n.local&&n.local();if(c)a[o]=n.callback?n.callback(c):c,t.Z.load[n.id]=a[o],~a.indexOf(null)||e(a);else{var u=new XMLHttpRequest;for(var d in u.onreadystatechange=function(){4==u.readyState&&(a[o]=u.status==(n.status||200)?n.callback?n.callback(u.responseText):u.responseText:void 0,t.Z.load[n.id]=a[o],~a.indexOf(null)||e(a))},u.open(n.method||"GET",n.url,!0),n.headers)u.setRequestHeader(d,n.headers[d]);u.send(n.body)}}))},mount:function(e,a){e.id&&!a&&(n[e.id]={W:[],F:function(){t.Z.mount(e,!0)}});var o=e.inner,c=e.outer,u=e.state,d=e.render(u);o&&(o.innerHTML=d),c&&(c.outerHTML=d),t.Z[e.id]=u},update:function(e){n[e]&&(n[e].F(),n[e].W.forEach((function(n){n(t.Z[e])})))},watch:function(t,e){n[t]&&n[t].W.push(e)}};e.mount({id:"body",render:function(n){return"\n    \t<h1>Hello ".concat(n.name,", aged ").concat(n.age,'!</h1>\n    \t<button onclick="Z.body.rename(\'batman\')">update</button>\n    \t<button onclick="Z.body.reage(1)">+1</button>\n    \t<button onclick="Z.body.reage(-1)">-1</button>\n    ')},inner:document.getElementsByTagName("body")[0],state:{name:"Paul",age:20,rename:function(n){this.name!==n&&(this.name=n,e.update("body"))},reage:function(n){this.age=this.age+n,e.update("body")}}}),e.watch("body",(function(n){console.log(n)}))}();
//# sourceMappingURL=test.js.map
