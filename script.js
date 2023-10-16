/*Access Key for the Unsplash API*/
const accessKey = "-Hpeg3kZC2kcJ64C6lYjbsY4QEOM6loPH7l84ED6pnY";

/*Storing important elements from HTML file in script file*/
/* the document object is a fundamental part of the Document Object Model (DOM). It represents the web page itself and provides a way to interact with the content and structure of a webpage.
 You can use the document object to access, manipulate, and modify elements, attributes, and other aspects of a web page. */
const formEl = document.querySelector("form");
/* use '.' when using class names */
const searchResults = document.querySelector(".search-results");
const inputEl = document.getElementById("search-input");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;


/*using async for response and fetch*/
async function searchImages(){

    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`; /* Creates our dynamic url */

/* The await keyword in JavaScript is used in conjunction with async functions to handle asynchronous operations. It makes working with promises more straightforward and allows
 you to write asynchronous code that looks more like synchronous code.*/
    const response = await fetch(url); /*fetch is used for making HTTP requests to retrieve resources from a network, typically data from a server, in an asynchronous (non-blocking) manner.*/
    const data = await response.json(); /*  'response' object is part of the Fetch API, and it represents the response to an HTTP request.
                                        It contains information about the response, including status, headers, and methods to access the response body.The response object also provides other 
                                        methods like .text() for reading the response as text, .blob() for reading the response as binary data, and others depending on the response type.*/

    const results = data.results;
/*Initialize page number */
    if(page ===1){
        searchResults.innerHTML = "";
    }

/* Pushes data into prebuilt template in H1 ,Duplicates template in HTML file in this script*/ 
    results.map((result) =>{  /* The map() method is a built-in JavaScript function that operates on arrays. It is used to create a new array by applying a given function to each element 
                            of an existing array. The result of the function is then added to the new array. The original array remains unchanged. */
        const imageWrapper = document.createElement("div") ;
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink= document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        /*append changes to webppage */
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1){
        showMore.style.display= "block"
    }
}

formEl.addEventListener("submit", (event) => {
    /* The preventDefault() method is a function in JavaScript that is commonly used in web development to prevent the default behavior of an event. It's primarily used with event handlers,
     such as those for form submissions, anchor tags, and other interactive elements on web pages. */
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", ()=>{
    searchImages();
});