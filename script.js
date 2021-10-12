const btnJokes = document.getElementById('dad-jokes');
// console.log(btnJokes);
const list = document.getElementById('joke-list');
// console.log(list);
const searchField = document.getElementById('search-jokes');
// console.log(searchField);
const pageNumber = document.getElementById('page');
// console.log(page);
const dadJokeUrl = 'https://icanhazdadjoke.com/';
let searchLimit = 'limit=30&';

const removeListItems = () => {
    const listItems = document.querySelectorAll('#joke-list li')
    Array.from(listItems).forEach(joke => {
        joke.parentElement.removeChild(joke)
    })
}

const addJokeToDom = array => {
    removeListItems();
    array.forEach(item => {
        const listItem = document.createElement('li')
        list.classList.add('joke-list-border');
        listItem.innerHTML = item.joke;
        list.appendChild(listItem)
    })
}

const getRandomJoke = async() => {
    try {
        let response = await fetch('https://icanhazdadjoke.com/', {
            headers: { 
                'Accept': 'application/json'
            }
        });
        let res = await response.json()
        // console.log(res)
        let array = [];
        array.push(res)
        // console.log(array)
        addJokeToDom(array)
    } catch(err) {
        console.log(err)
    }
}

btnJokes.addEventListener('click', getRandomJoke)

const searchJoke = async() => {
    let response = await fetch(`${dadJokeUrl}search?${searchLimit}term=${searchField.value}&page=${pageNumber.value}`, {
        headers: { 
            'Accept': 'application/json'
        }
    })
    let res = await response.json()
    let array = res.results;
    // console.log(array);
    addJokeToDom(array)
}

searchField.addEventListener('search', searchJoke)
pageNumber.addEventListener('change', searchJoke)
