//method for fetching api from google translate using rapidapi
var toLanguage = document.getElementById("toLanguage");
function getLanguages() {
    var myHeaders = new Headers();
    myHeaders.append("X-RapidAPI-Key", "febabe408bmsh973a1a76ea6d62dp1c7cebjsnd25eca682889");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch("https://google-translate1.p.rapidapi.com/language/translate/v2/languages", requestOptions)
        .then(response => response.json())
        .then(result => createLanguagesList(result.data))
        .catch(error => console.log('error', error));
}
/*this will create a list of languages for translation using google translate via rapidapi
when drop-down menu is clicked*/
function createLanguagesList(langauges) {
    for (var i = 0; i < langauges.languages.length; i++) {
        var language = langauges.languages[i]
        var option = document.createElement("option");
        option.value = language.language
        option.text = language.language
        toLanguage.add(option);
    }
}

function populateTranslation(aTranslation) {
    console.log(aTranslation[0].translations[0].text);
    var tranlateBox = document.getElementById("movieTranslation");
    tranlateBox.textContent = aTranslation[0].translations[0].text;
}


function doTranslateBing(textToTranslate, languageId){
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
            'X-RapidAPI-Key': '0b7abf8e78msha3ce1f6a5cc24ffp10e0bdjsn5c64b154c100'
        },
        body: '[{"Text":"' + textToTranslate + '"}]'
    };
    
    fetch('https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D='+ languageId + '&api-version=3.0&from=en&profanityAction=NoAction&textType=plain', options)
        .then(response => response.json())
        .then(result => populateTranslation(result))
        //.then(response => console.log(response))
        .catch(err => console.error(err));
}


function doTranslation(textToTranlsate, languageId) {
    console.log("working")

    var myHeaders = new Headers();
    myHeaders.append("Accept-Encoding", "application/gzip");
    myHeaders.append("X-RapidAPI-Host", "google-translate1.p.rapidapi.com");
    myHeaders.append("X-RapidAPI-Key", "febabe408bmsh973a1a76ea6d62dp1c7cebjsnd25eca682889");
    myHeaders.append("content-type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("q", textToTranlsate);
    urlencoded.append("target", languageId);
    urlencoded.append("source", "en");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", requestOptions)
        .then(response => response.json())
        //.then(result => console.log(result))
        .then(result => populateTranslation(result.data.translations[0].translatedText))
        .catch(error => console.log('error', error));


}
//getLanguages();

var translatebutton = document.getElementById("doTranslate");
translatebutton.addEventListener("click", function (event) {
    doTranslateBing(movieToTranslateText.textContent, toLanguage.value);
});
