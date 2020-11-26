/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const BookmarkList = [
        {id:cuid(), title: 'google', url: 'http://google.com', desc: "google page", rate: 3},
        {id:cuid(), title: 'github', url: 'http:github.com', desc: "github page", rate: 4}
    ];


const generageBookmarkElement = function(mark){
    console.log(mark);
    return `<li class="bookmark-container" data-item-id="${mark.id}"> 
    <h3>${mark.title}</h3>
    <p class="rate">${mark.rate}</p>
    <p>${mark.desc}</p>
    <p><a href="${mark.url}" calss="link">Link</a></p>
    <button class="detail-bookmark-button">•••</button>
    <button class="delete-bookmark-button">Delete</button>
</li>`
};

const generateBookmarkString = function(item){
    const bookmarks = item.map((item)=> generageBookmarkElement(item));
    return bookmarks.join("");
};


const render = function(){
    const bookmarkString = generateBookmarkString(BookmarkList);
    $('.bookmark-article').html(bookmarkString);
};

const addBookmarkList = function(newTitle, newUrl, newDesc, newRate){
    BookmarkList.push({id: cuid(), title: newTitle , url: newUrl, desc: newDesc, rate: newRate});
}

const addBookmarksubmit = function(){
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
    <button class="add-submit-button">submit</button>
</form>`);
    $('#add-bookmark').on('submit', '.add-submit-button',event=>{
        event.preventDefault();

        const siteTitle = $(event.target).find('#title').value();
        const siteURL = $(event.target).find('#url').value();
        const siteDesc = $(event.target).find('#desc').value();
        const siteRate = $(event.target).find('#rate').value();

        let bookmark = {
            title : siteTitle,
            url : siteURL ,
            desc : siteDesc ,
            rate : siteRate
        }
            addBookmarkList(bookmark);
            render();
    })
};

const addBookmarkPage = function(){
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
        <button class="add-submit-button">submit</button>
    </form>`)
};


const addBookmarkClick = function(){
    return $(`#add-bookmark`).on('click', '.add-bookmark-button', event=>{
        event.preventDefault();
        $('.hidden').removeClass('hidden');
        addBookmarksubmit();
})
};

const deleteBookmarkClick = function(){
    console.log('deleteBookmarkClick');
};

const main = function(){
render();
addBookmarksubmit();
addBookmarkClick();
deleteBookmarkClick();
}

$(main);