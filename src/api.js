/* eslint-disable no-unused-vars */
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/hyunwoo';

const listApiFetch = function (...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };

        if(!res.headers.get('content-type').includes('json')){
          error.message = res.statusText;
        }
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};
  
const getBookmark = function () {
    return listApiFetch(`${BASE_URL}/bookmarks`);
  };

const createBookmark = function (newBookmark) {
  return listApiFetch(`${BASE_URL}/bookmarks`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: newBookmark
    });
};

const updateBookmark = function(id, updateData){
    const update = JSON.stringify(updateData);
    return listApiFetch(`${BASE_URL}/bookmarks/${id}`,{
        method : 'PATCH' ,
        headers : {
            'Content-Type' : 'application/json'
        },
        body: update,
    })
}

const deleteBookmark = function(id){
    return listApiFetch(`${BASE_URL}/bookmarks/${id}`,{
        method: 'DELETE'
    })
}

export default {
    getBookmark,
    createBookmark,
    updateBookmark,
    deleteBookmark
}