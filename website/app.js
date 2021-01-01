/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=7db7c69e403a7423a5d945022bdac359&units=imperial';
const submit = document.getElementById('generate');
const zipCode = document.getElementById('zip');
const feeling = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


// submit button
submit.addEventListener('click', performAction);

//taking action after pressing
function performAction(e) {
    e.preventDefault();

    // taking the input values
    const zipEntered = zipCode.value;
    const content = feeling.value;

    //excute functions in chain promises
    getZip(baseUrl, zipEntered, apiKey)
        .then((userData) => {
            postData('/add', { temp: userData.main.temp, content, date: newDate })
        })
        .then(() => { updateUI() });

    // clear the input text after executing all the functions
    removeText();

}

//fetcing the data using zip code for USA
const getZip = async (baseUrl, zipEntered, apiKey) => {
    const res = await fetch(baseUrl + zipEntered + apiKey);
    try {
        const userData = await res.json();
        return userData;
    } catch (err) {
        console.log(`error is: ${err}`)
    }
}

//Posting the data to the severside
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (err) {
        console.log(`error is: ${err}`)
    }
}

//updating the content in the html by the new data
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
        document.getElementById('date').innerHTML = allData.date;


    } catch (err) {
        console.log(`error is: ${err}`);
    }
}

// clear the input text after executing all the functions
const removeText = async () => {
    try {
        zipCode.value = '';
        feeling.value = '';

    } catch (err) {
        console.log(`error is: ${err}`);
    }
}

