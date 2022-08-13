const form = document.querySelector('#form');
const searchInput = document.querySelector('#search');
const gifArea = document.querySelector("#gif-area");

const API_KEY = "ELg6SR86oaenCG9B4vfK3yy2w8UKzUQA";

// EventListener for FORM when submitted
form.addEventListener("submit", function (e) {
    e.preventDefault();
    giphyInfo();
});

async function giphyInfo() {
    try {
        const searchValue = searchInput.value;
        searchInput.value = '';
        const res = await axios.get('https://api.giphy.com/v1/gifs/search',
            {
                params:
                    { api_key: API_KEY, q: searchValue }
            });
        appendRandomGif(res.data);
    } catch (e) {

        gifArea.innerHTML = `<h1 class="text-white text-center my-5" style="font-size: 20px;">Requested GIF does not exist!!! Please try another one!!!</h1>`;
    }
}

// Function to append GIF on the DOM
function appendRandomGif(resData) {

    // Based on length of the number of gifs returned lets select a random number and select a GIF on that index number
    const numOfGIFS = resData.data.length;
    const randomNum = Math.floor(Math.random() * numOfGIFS);
    
    // Creating a new image to append the URL property inside data property as image source
    const newGIF = document.createElement('img');
    newGIF.classList.add('gif');
    newGIF.src = resData.data[randomNum].images.original.url;

    //Append the new random GIF to the DOM under the "gif-area" div
    const newColDiv = document.createElement('div');
    newColDiv.classList.add('col-12','col-md-4','mb-3','text-center');
    newColDiv.append(newGIF);
    gifArea.append(newColDiv);
}

//Event Listener to remove all GIFS when the "remove" button is clicked
const removeBtn = document.querySelector('#remove');
removeBtn.addEventListener('click', function () {

    // Clearing the "gif-area" div
    gifArea.innerHTML='';
})