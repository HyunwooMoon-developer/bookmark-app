/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const Bookmark = [];
/*
$.fn.extend({
    serializeJson: function(){
        const formData = new FormData(this[0]);
        const obj = {};
        formData.forEach((val, name) => obj[name] = val);
        return JSON.stringify(obj);
    }
})
*/
const generageBookmarkElement = function(item){
    console.log(item);
    return `<li class="bookmark-container" data-item-id="${item.id}"> 
    <h3>${item.title}</h3>
    <p class="rate">${item.rate}</p>
    <p>${item.desc}</p>
    <p><a href="${item.url}" calss="link">Link</a></p>
    <button class="detail-bookmark-button">•••</button>
    <button class="delete-bookmark-button">Delete</button>
</li>`
};

const generateBookmarkString = function(item){
    const bookmarks = item.map((item)=> generageBookmarkElement(item));
    return bookmarks.join("");
};

const getItemIdFromElement = function(item){
    return $(item)
            .closest('li')
            .data('item-id');
};

const render = function(){
    console.log('render ran');
    const bookmarkString = generateBookmarkString(Bookmark);
    $('.bookmark-article').html(bookmarkString);
};


const addBookmarkSubmit = function(){
    $('#add-bookmark').on('submit', '.add-submit-button' ,event=>{
        /*
        console.log($(event.target).serializeJson());
        */
       event.preventDefault();
       console.log('ran');
    });
};

const addMarkPage = function(){
    $('.add-container').html(`<form id="add-bookmark">
    <label for="title">Title : </label>
    <input type="text" id="title" name="title" placeholder="type title" required>
    <label for="url">URL : </label>
    <input type="text" id="url" name="url" placeholder="type url" required>
    <br>
    <label for="description">Description of Bookmark</label>   
    <br> 
    <textarea name="description" id="desc" cols="30" rows="3"></textarea>
    <select name="rate" id="rate">
        <option value="rate rate-one">1</option>
        <option value="rate rate-two">2</option>
        <option value="rate rate-three">3</option>
        <option value="rate rate-four">4</option>
        <option value="rate rate-five">5</option>
    </select>
    <button type='submit' class="add-submit-button">submit</button>
</form>`);
}

const addBookmarkClick = function(){
    return $(`#add-bookmark`).on('click', '.add-bookmark-button', event=>{
        event.preventDefault();
        $('.hidden').removeClass('hidden');
        addMarkPage();
})
};

const deleteBookmarkClick = function(){
    $('.bookmark-article').on('click', 'delete-bookmark-button' , event=>{
        const itemId = getItemIdFromElement(event.currentTarget);
        console.log('delete');
    })
};

const main = function(){
render();
addBookmarkSubmit();
addBookmarkClick();
deleteBookmarkClick();
}

$(main);