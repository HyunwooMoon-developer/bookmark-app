# bookmark-app
bookmark-app

To receive a passing grade, the project must:

Fulfill every non-extension user story below
Fulfill every non-extension technical requirement below


Requirements as User Stories
I can add bookmarks to my bookmark list. Bookmarks contain a title (string), url link (string), description (string), rating (number, 1-5)

I can see a list of my bookmarks when I first open the app

All bookmarks in the list default to a "condensed" view showing only title and rating
I can click on a bookmark to display the "detailed" view

Detailed view additionally contains description and a "Visit Site" link
I can remove bookmarks from my bookmark list

I receive appropriate server feedback when I cannot add/update a bookmark

See API validations 

I can select from a dropdown a "minimum rating" to filter the list by all bookmarks rated equal or above the chosen selection

Technical Requirements
Use fetch for AJAX calls and jQuery for DOM manipulation

Use namespacing to adhere to good architecture practices

Minimal global variables
Create modules in separate files to organize your code
Logically group your functions (e.g. API methods, store methods...)
Keep your Data out of the DOM

No direct DOM manipulation in your event handlers!
Follow the React-ful design pattern - change your state, re-render your component

Initial View
Expanded Bookmark View
Add Bookmark Form
Form Error
