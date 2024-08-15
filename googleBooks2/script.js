/*--------------------------------------------------------------------*/
/* @script        - script.js                                         */
/* @date          - 07-AUG-2024                                       */
/* @author        - David B. Mitchell                                 */
/* @description   - Javascript for googleBooks.html web page.         */
/*--------------------------------------------------------------------*/
const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
let httpRequestError = false;

const keyup = (event) => {
  let url = encode(baseUrl + event.target.value);
  let body = { method: 'GET', headers: {} };
  document.querySelector('p').innerHTML = url;
  getBooks(url, body).then((response) => {
    let { items, error } = response;
    if (items) {
      if (!httpRequestError) {
        console.info(response);
        document.querySelector('textarea').value = JSON.stringify(response, null, 2);
      }
    }
    else if (error) {
      httpRequestError = true;
      window.setTimeout(() => { httpRequestError = false; }, 300);
      console.error(error);
      document.querySelector('textarea').value = (`error ${error.code}: ${error.message}`);
    }
  });
  //getBooks2(url, body);
}

const encode = (url) => {
  return encodeURI(url.trim().replace(/\s/g, '+').toLowerCase());
}

const getBooks = async (url, body) => {
  let response = await fetch(url, body);
  return response.json();
}

const getBooks2 = ((url, request) => {
  fetch(url, request)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let { items, error } = response;
      if (items) {
        console.info(response);
        let textarea = document.querySelector('textarea');
        textarea.value = JSON.stringify(items, null, 2);
      }
      else if (error) {
        console.error(error);
        let textarea = document.querySelector('textarea');
        textarea.value = `Error ${error.code}: ${error.message}`;
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
});

const init = (() => {
  console.clear();
  document.querySelector('a').setAttribute('href', 'https://books.google.com');
  document.querySelector('a').setAttribute('title', `uuid: ${crypto.randomUUID()}`);
  document.querySelector('img').setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1lELf0-vnB_Y-iqh6vBgnszH6sgUpElLDeQ&s');
  document.querySelector('[name="input1"]').setAttribute('placeholder', 'Type your query here...');
});
