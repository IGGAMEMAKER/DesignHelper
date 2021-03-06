const saveInStorage = (field, data) => {
  var item = data;
  if (typeof(data)=='object') {
    //console.log('object');
    item = JSON.stringify(data);
  }
  localStorage.setItem(field, item);
  //storage[field] = item;
};

const getFromStorage = (field)=> {
  return localStorage.getItem(field);
};

const getObject = (arrName)=> {
  return JSON.parse( getFromStorage(arrName) );
};

const setInObject = (arrName, id , value)=> {
  var array = getObject(arrName);

  array[id] = value;
  saveInStorage(arrName, array);
};

const unsetFromObject = (arrName, id)=> {
  var array = getObject(arrName);

  delete array[id];

  saveInStorage(arrName, array);
};

const clearStorage = ()=> {
  localStorage.clear();
};

//clearStorage();

// cookies
// возвращает cookie если есть или undefined
const getCookie = (name) => {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
};

// уcтанавливает cookie
const setCookie = (name, value, props) => {
  props = props || {}
  var exp = props.expires
  if (typeof exp == "number" && exp) {
    var d = new Date()
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d
  }
  if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }

  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for(var propName in props){
    updatedCookie += "; " + propName
    var propValue = props[propName]
    if(propValue !== true){ updatedCookie += "=" + propValue }
  }
  document.cookie = updatedCookie

};

// удаляет cookie
const deleteCookie = (name) => {
  setCookie(name, null, { expires: -1 })
};

export default {
  deleteCookie,
  saveInStorage,
  getFromStorage,
  getObject,
  setInObject,
  unsetFromObject,
  clearStorage,
  getCookie,
  setCookie
};
