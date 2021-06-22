export default function(obj){
  Z[obj.id] = obj;
}

Z.xhr = (obj, arr, i, cb) => {
  arr = arr || [];
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      arr[i || 0] = xhr.status == (obj.status || 200) ? 
      obj.callback ? 
        obj.callback(xhr.responseText)
        : xhr.responseText 
      : undefined;
      cb && !~arr.indexOf(null) && cb(arr);
    }
  };
  xhr.open(obj.method || "GET", obj.url, true);
  for (let id in obj.headers) {
    xhr.setRequestHeader(id, obj.headers[id]);
  }
  xhr.send(obj.body);    
}

Z.xhrs = (arr, callback) => {
  const arrResolved = [];
  arr.forEach((obj, index) => {
    arrResolved[index] = null;
  });
  arr.forEach((obj, index) => {
    const localStore = obj.local && obj.local();
    if (localStore) {
      arrResolved[index] = obj.callback
        ? obj.callback(localStore)
        : localStore;
      callback && !~arrResolved.indexOf(null) && callback(arrResolved);
    } else {
      Z.xhr(obj, arrResolved, index, callback);
    }
  });
}