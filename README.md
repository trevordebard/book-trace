# Book Trace

Application that allows users to build and maintain an active reading list. 

## Tech 

- React
- Next.js
- TypeScript
- Postgres database with Prisma as ORM
- Chakra UI
- Axios

## Data fetching

### [OpenLibrary API](https://openlibrary.org/developers/api)

This is a simple open source REST API that can be used to search for books by title. When a user searches for a book, I make a request to the OpenLibrary API to retrieve a list of books that match the title provided by the user.
  - Related Files
    - Client Request Wrapper: `/lib/searchBook.ts`

### Internal Data Fetching

#### `/api/book`

- If POST request with information about a book and a username is sent to this route, the book data is inserted into a Postgres database I am hosting on Digital Ocean and will be associated to the username.
  - Related files
    - Server Handler: `pages/api/book.ts`
    - Client Request Wrapper: `lib/addBookToList.ts`

- If a PUT request is sent to this route, information about the book will be updated in the database. Currently this route is used to mark books in a users reading list as read or unread.
  - Related files
    - Server Handler: `pages/api/book.ts`
    - Client Request Wrapper: `lib/toggleBookComplete.ts`

#### `/pages/list/[username].tsx`

- This page is where users can view their reading list. The page is server rendered, so the data is fetched directly on the server and the fully rendered page is delivered to the client. 
  - This page can be accessed by visiting books.trevordebard.com/list/[your_username]. It is also linked to after logging in.

## How To Use

1. Type in a username you would like to use and click "Go". If you have already used the application before, you can reuse your previous username to see your saved reading list.
2. Select "Search for a book."
3. Enter the name of a book you'd like to read and click "Search."
4. Find the result that matches what you want to read and click "Add to list."
5. View your list my clicking the "View my list" link at the top or by going to the previous page and clicking "View my reading list."
6. Books that you have added are visible on this page. When you have finished reading a book, you can click "Mark as Read" to complete it. 

## Next Steps
- When a button is pressed, all buttons display a loading spinner. This should be updated so that just the button pressed displays a loading spinner.
- When a book is added to a list, I refresh the router to pull in the user's list from the server. This causes a slight delay from when loading ends to the book being updated with a "Read" status. This could be avoided with an optimistic response in state.
- When a user searches for a book, it would be helpful to display book covers so they can make sure they are adding the correct book.
- Right now anyone could use another person's username and modify/view that person's list. Full password authentication should be added to prevent this.
- Users should have the ability to remove a book from a reading list.
