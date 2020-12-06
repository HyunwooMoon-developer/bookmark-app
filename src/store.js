/* eslint-disable no-unused-vars */


const Bookmark = [];
let error = null ;
let adding = false;
let expanded = false;

const findById = function(id){
    return this.Bookmark.find(item => item.id === id);
};

const addBookmark = function(item){
    this.Bookmark.push(item);

};

const findAndDelete = function(id){
    this.Bookmark = this.Bookmark.filter(item => item.id !== id);
};

const filterList = function(items){
    this.Bookmark = this.Bookmark.filter(item => item.rating === items)
}


const filterByRating = function(items){
    this.Bookmark = this.Bookmark.filter(item => {
       item.rating = items ;
    })
}

const setError = function(error){
    this.error = error;
};


export default {
    Bookmark,
    expanded,
    error,
    adding,
    findById,
    filterList,
    findAndDelete,
    filterByRating,
    addBookmark,
    setError
}