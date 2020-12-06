/* eslint-disable no-unused-vars */
import $ from 'jquery';
import store from './store';
import api from './api';


$.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });

const generateBookmarkElement = function(item){
        return `<li class="bookmark-container" data-item-id="${item.id}"> 
        <h3>${item.title}</h3>
        <p class="rate">${item.rating}</p>
        <p class="${item.expanded ? '' : "article-expanded"}">${item.desc}</p>
        <p class="${item.expanded ? '' : "article-expanded"}"><a href="${item.url}" calss="link">Visit this site</a></p>   
        <button class="detail-bookmark-button">...</button>
        <button class="delete-bookmark-button">Delete</button>
    </li>`
    }

const generateBookmarkString = function(items){
    const bookmarks = items.map((item)=> generateBookmarkElement(item));
    return bookmarks.join("");
};


const generateBookmarkPage = function(){
    $('main').html(`
                <button class="js-add-button">Add Bookmark</button>
                <label value="filter">Filter by Rate
                <select name="filter" id="filter" class="filter">
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
                </labe>
                <div class="js-add-container">

                </div>
            <ul class="bookmark-article">

            </ul>
 
    `)
}


const generateError = function(error){
    return `
    <div class="error-message">
        <button id="cancel-error">Cancel</button>
        <p>${error}</p>
    </div>
    `;
}

const renderError = function(){
    if(store.error){
        const emessage = generateError(store.error)
    }
}

const render = function(){
    renderError();

    const bookmarkString = generateBookmarkString(store.Bookmark);
        $('.bookmark-article').html(bookmarkString);

}
const filterClick = function(){
    $('#filter').on('change', () =>{
        const filterValue = $('#filter option:selected').val();
        store.Bookmark[filter] = filterValue;
        
    

        render();
 
    })
}



const AddBookmarkPage = function(){
    if(store.adding === true){
        let form = `<form id="add-bookmark">
        <label for="title">Title : </label>
        <input type="text" id="title" name="title" placeholder="type title" required>
        <label for="url">URL : </label>
        <input type="text" id="url" name="url" placeholder="type url" required>
        <br>
        <label for="description">Description of Bookmark</label>   
        <br> 
        <textarea name="desc" id="desc" cols="30" rows="3"></textarea>
        <label>Rate
        <select name="rating" id="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        </label>
        <button type='submit' class="add-submit-button">submit</button>
        </form>`
        $('.js-add-container').html(form)
    }
    else{
        $('.js-add-container').empty();
    }
    //render();
}


const clickAddBookmark = function(){
    $('main').on('click', '.js-add-button' , e=>{
        e.preventDefault();
        store.adding = true ;
        AddBookmarkPage();
    })

    }

    const addBookmarkSubmit = function(){
        $('.js-add-container').on('click', '.add-submit-button' ,e => {
            e.preventDefault(); 
            const newBookmark = $('#add-bookmark').serializeJson();

            api.createBookmark(newBookmark)
            .then((bookmark) =>{
                store.addBookmark(bookmark);
                store.adding = false;
                store.expanded = false;
                store.filter = 0;
            $('.js-add-container').empty();
                render();
            })
            .catch(e =>{
                store.setError(e.message);
                renderError();
            })

            }) 
    };




    const detailBookmarkView = function(detail){
        let id = detail.parent().data('itemId');
        const item = store.findById(id);
        item.expanded = !item.expanded;
    }
    
    const detailBookmarkClicked = function(){
        $('.bookmark-article').on('click', '.detail-bookmark-button' ,  event=>{
            const detail = $(event.target);
            detailBookmarkView(detail);
            render();
        });
    }

    


    

const deleteBookmarkClick = function(){
    $('.bookmark-article').on('click', '.delete-bookmark-button' , e=>{
        const id = $(e.currentTarget).parent().data('item-id');

        api.deleteBookmark(id)
        .then(() => {
            store.findAndDelete(id);
            render();
        })
        .catch(e =>{
            store.setError(e.message);
            renderError()
        })
    })
}

    const bindEventListener = function(){
    generateBookmarkPage(),
    clickAddBookmark(),
    deleteBookmarkClick(),
    addBookmarkSubmit(),
    detailBookmarkClicked(),
    filterClick()
}


export default {
    bindEventListener,
    render
}

/*
const generageBookmarkElement = function(item){
    return `<li class="bookmark-container" data-item-id="${item.id}"> 
    <h3>${item.title}</h3>
    <p class="rate">${item.rate}</p>
    <p class="${item.expanded ? '' : "article-expanded"}">${item.desc}</p>
    <p class="${item.expanded ? '' : "article-expanded"}"><a href="${item.url}" calss="link">Link</a></p>   
    <button class="detail-bookmark-button">Detail</button>
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
    $('.add-container').on('click', '.add-submit-button' ,function(event){
        event.preventDefault(); 
        var formElement = $(event.target).parent();
        var title = formElement.find("#title").val();
        var url = formElement.find('#url').val();
        var desc = formElement.find('#desc').val();
        var rate = formElement.find('#rate').val();
        
        let bookmarkValues = {
            title : title,
            url : url,
            desc : desc,
            rate: rate,
            expanded: false
        }
        
        Bookmark.push(bookmarkValues);
        render();
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
        <option class="rate" value="1">1</option>
        <option class="rate" value="2">2</option>
        <option class="rate" value="3">3</option>
        <option class="rate" value="4">4</option>
        <option class="rate" value="5">5</option>
    </select>
    <button type='submit' class="add-submit-button">submit</button>
</form>`);
}

const addBookmarkClick = function(){
    return $('.add-bookmark-button').on('click', event=>{
        event.preventDefault();
        $('.hidden').removeClass('hidden');
        addMarkPage();
})
};

const detailBookmarkView = function(detail){
    let id = detail.parent().data('itemId');
    const item = Bookmark.find(item => item.id === id);
    item.expanded = !item.expanded;
}

const detailBookmarkClicked = function(){
    $('.bookmark-article').on('click', '.detail-bookmark-button' ,  event=>{
        const detail = $(event.target);
        detailBookmarkView(detail);
        render();
    });
}

const deleteBookmarkList = function(itemId){
    let id = itemId.parent().data('itemId')
    const item = Bookmark.find(item => item.id = id);
     Bookmark.splice(item, 1);
}


const deleteBookmarkClick = function(){
    $('.bookmark-article').on('click', '.delete-bookmark-button' , event=>{
        const itemId = $(event.currenttarget);
        deleteBookmarkList(itemId);
        render();
    })
}
*/