/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import $ from 'jquery';
import 'normalize.css';
import './index.css';
import store from './store';
import api from './api';
import  bookmarks from './bookmark';

const main = function(){
    api.getBookmark()
        .then((response) => {
            response.forEach((bookmark) => store.addBookmark(bookmark));
            bookmarks.render();
        })
    bookmarks.bindEventListener();
};

$(main);

