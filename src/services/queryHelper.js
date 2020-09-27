const parseQuery = (searchString) => {
  let queryParam = {};
  searchString = searchString.substr(1,searchString.length);
  let params = searchString.split('&');

  for(let i=0;i < params.length; i++){
    let pivot = params[i].indexOf('=');

    queryParam[params[i].substr(0,pivot)] = params[i].substr(pivot+1,params[i].length);
  }

  return queryParam;
};


const strigifyQuery = (searchObject) => {
  let queryString = '?';

  for(let key in searchObject){
    if(searchObject[key]){
      queryString += key + '=' + searchObject[key] + '&';
    }
  }

  queryString = queryString.replace(/&$/, '');

  return queryString;

};

export { parseQuery , strigifyQuery}
