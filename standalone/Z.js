function Z(obj) {
  Z[obj.id] = obj;
}

Z.xhr = function (obj, arr, i, cb) {
  arr = arr || [];
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      arr[i || 0] =
        xhr.status == (obj.status || 200)
          ? obj.callback
            ? obj.callback(xhr.responseText)
            : xhr.responseText
          : undefined;
      cb && !~arr.indexOf(null) && cb(arr);
    }
  };

  xhr.open(obj.method || "GET", obj.url, true);

  for (var id in obj.headers) {
    xhr.setRequestHeader(id, obj.headers[id]);
  }

  xhr.send(obj.body);
};

Z.xhrs = function (arr, callback) {
  var arrResolved = [];
  arr.forEach(function (obj, index) {
    arrResolved[index] = null;
  });
  arr.forEach(function (obj, index) {
    var localStore = obj.local && obj.local();

    if (localStore) {
      arrResolved[index] = obj.callback ? obj.callback(localStore) : localStore;
      callback && !~arrResolved.indexOf(null) && callback(arrResolved);
    } else {
      Z.xhr(obj, arrResolved, index, callback);
    }
  });
};
