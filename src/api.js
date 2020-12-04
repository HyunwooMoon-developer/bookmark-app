/* eslint-disable no-unused-vars */
const searchURL = 'https://thinkful-list-api.herokuapp.com/HyunwooMoon';

const listApiFetch = function(...args){
    let error ;
    return fetch(...args)
    .then(response => {
        if(!response.ok){
            error = {
                code: response.status}
        if(!response.headers.get('content-type').includes('json')){
            error.message = response.statusText ;
            return Promise.reject(error);
        }
        }
        return response.json();
    })
    .then(data=>{
        if(error){
            error.message = data.message;
            return Promise.reject(error);
        }
        return data;
    });
};

const getBookmark = function(){
    return listApiFetch(`${searchURL}/bookmarks`);
}

const createBookmark = function(item){
    const newBookmark = JSON.stringify({item});
    return listApiFetch(`${searchURL}/bookmarks`,{
        method: 'POST',
        header : {
            'Content-Type' : 'application/json'
        },
        body: newBookmark
    })
}

const updateBookmark = function(id, updateData){
    const update = JSON.stringify(updateData);
    return listApiFetch(`${searchURL}/bookmarks/${id}`,{
        method : 'PATCH' ,
        headers : {
            'Content-Type' : 'application/json'
        },
        body: update
    })
}

const deleteBookmark = function(id){
    return listApiFetch(`${searchURL}/bookmarks/${id}`,{
        method: 'DELETE'
    })
}

export default {
    getBookmark,
    createBookmark,
    updateBookmark,
    deleteBookmark
}