// PubSub store
const topics = {};

// globalize Zed
const w = window;

export default w.Z = {
  // this is basically just a Promise.all polyfil
  // A way to make multiple asynchronous ajax requests
  // Then call a callback when all have resloved
  load: (arr, callback) => {
    // store for resolved requests
    const arrResolved = [];
    arr.forEach((obj, index) => {
      // placehold the response as "null"
      arrResolved[index] = null;
    });

    // loop over the array of objects
    // which are the individual requests
    arr.forEach((obj, index) => {

      // check local first
      const localStore = obj.local && obj.local();
      if (localStore) {
        arrResolved[index] = obj.callback
          ? obj.callback(localStore)
          : localStore;
        w.Z.load[obj.id] = arrResolved[index];
        if (!~arrResolved.indexOf(null)) {
          callback(arrResolved);
        }
      } else {

        // standard ajax
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4) {
            // update the resolved array with the response
            arrResolved[index] =
              xhr.status == (obj.status || 200)
                ? // if the object has its own callback
                  obj.callback
                  ? // pass the response to it
                    obj.callback(xhr.responseText)
                  : // else just update the resolved array with the response
                    xhr.responseText
                : // if 404 or 405 etc resolve as undefined
                  // NOTE: might be worth passing the
                  // error code as the response
                  undefined;

            // make the response global using the id as the object key
            w.Z.load[obj.id] = arrResolved[index];

            // if all requests have resolved
            if (!~arrResolved.indexOf(null)) {
              // call the callback
              callback(arrResolved);
            }
          }
        };

        // more standard ajax
        // allow for "PUT" or "POST" methods etc
        xhr.open(obj.method || "GET", obj.url, true);

        // and custom headers in request
        for (let id in obj.headers) {
          xhr.setRequestHeader(id, obj.headers[id]);
        }
        xhr.send(obj.body);
      }
    });
  },

  // the mount method
  mount: (obj, noSubscribe) => {
    // only subscribe when there is an id
    // only subscribe on Z.mount
    if (obj.id && !noSubscribe) {
      // create subscription
      topics[obj.id] = {
        // array of potential watchers
        W: [],

        // Update methods
        F: () => {
          // re-mount (update)
          // not resubscribed
          w.Z.mount(obj, true);
        },
      };
    }

    // assign the methods to a variables
    const inner = obj.inner;
    const outer = obj.outer;
    const state = obj.state;
    const render = obj.render(state);
    if (inner) {
      // render inside the mount DOM element
      inner.innerHTML = render;
    }
    if (outer) {
      // render to the mount DOM element and replace
      outer.outerHTML = render;
    }

    // update state to global method
    w.Z[obj.id] = state;
  },

  // the update method is just a
  // PubSub container function
  update: id => {
    if (topics[id]) {
      // Publish
      topics[id].F();

      // Publish to any watchers
      topics[id].W.forEach(fn => {
        fn(w.Z[id]);
      });
    }
  },

  // the watch method is just a
  // PubSub container function
  watch: (id, fn) => {
    // Subscribe if topic (id of the mount) exists
    topics[id] && topics[id].W.push(fn);
  },
};