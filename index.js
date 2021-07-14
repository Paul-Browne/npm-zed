export default function Z(obj) {
  Z[obj.id] = obj;
}

Z.xhr = function (obj, arr, i, cb, ls, xhr, id) {
  arr = arr || [];
  ls = obj.local && obj.local();
  if(ls){
    arr[i||0] = obj.callback ? obj.callback(ls) : ls;
    cb && !~arr.indexOf(undefined) && cb(arr);
  }else{
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        arr[i || 0] = xhr.status == (obj.status || 200) ? obj.callback ? obj.callback(xhr.responseText) : xhr.responseText : null;
        cb && !~arr.indexOf(undefined) && cb(arr);
      }
    };
    xhr.open(obj.method || "GET", obj.url, true);
    for (id in obj.headers) {
      xhr.setRequestHeader(id, obj.headers[id]);
    }
    xhr.send(obj.body);
  }
};

Z.xhrs = function (arr, callback, arrResolved, i) {
  arrResolved = arr.map(function(){});
  for (i in arr){
    Z.xhr(arr[i], arrResolved, i, callback);
  }
};