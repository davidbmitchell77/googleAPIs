"use strict"
/*------------------------------------------------------------------------*/
/* @script        - googleBooks.js                                        */
/* @date          - 04-AUG-2024                                           */
/* @author        - David B. Mitchell                                     */
/* @description   - Javascript for googleBooks.html web page.             */
/*------------------------------------------------------------------------*/
document.querySelector('a').setAttribute('href', 'https://books.google.com');
document.querySelector('a').setAttribute('title', `uuid: ${crypto.randomUUID()}`);
document.querySelector('img').setAttribute('src', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1lELf0-vnB_Y-iqh6vBgnszH6sgUpElLDeQ&s");

const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const keyUp = (event) => {
    if (event.target.value.length > 1) {
        let query   = (baseUrl + event.target.value);
        let options = { method: 'GET', headers: {} };
        getBooks(query, options);
        getBooksAsync(query, options);
    }
    else {
      document.querySelector('textarea').value = null;
    }
};

const getBooks = ((url, request) => {
    fetch(url, request).then((response) => {
        return response.json();
    })
   .then((response) => {
        console.info(response);
        let textArea = document.querySelector('textarea');
        if (textArea) {
            textArea.value = JSON.stringify(response, null, 2);
        }
    })
   .catch((error) => {
        console.error(error);
        throw error;
    });
});

async function getBooksAsync(url, request) {
    let response = await fetch(url, request);
    if (response.ok) {
        console.info(`Status: ${response.status}`, response.json());
    }
    else {
        console.error(`Status: ${response.status}`, response.json());
    }
}
