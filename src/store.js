/* eslint-disable no-unused-vars */


const Bookmark = [];
let error = null ;
let adding = false;
let expanded = false;
let filter = 0;

const findById = function(id){
    return this.Bookmark.find(item => item.id === id);
};

const addBookmark = function(item){
    this.Bookmark.push(item);

};

const findAndDelete = function(id){
    this.Bookmark = this.Bookmark.filter(item => item.id !== id);
};

/*const findAndUpdate = function(id, newData){
    const current = this.findById(id);
    Object.assign(current, newData);
};*/



const setError = function(error){
    this.error = error;
};

export default {
    Bookmark,
    expanded,
    error,
    adding,
    filter,
    findById,
    findAndDelete,
    /*findAndUpdate*/
    addBookmark,
    setError
}