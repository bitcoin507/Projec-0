//method for fetching api from google translate using rapidapi
function getLanguages() {
    var myHeaders = new Headers();
    myHeaders.append("X-RapidAPI-Key", "3a9b9beb0amsh0cbdcdada685233p1fdeebjsn7477d1608833");

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
    var toLanguage = document.getElementById("toLanguage");
    for (var i = 0; i < langauges.languages.length; i++) {
        var language = langauges.languages[i]
        var option = document.createElement("option");
        option.value = language.language
        option.text = language.language
        toLanguage.add(option);
    }
}

function doTranslation(textToTranlsate, languageId) {

    var myHeaders = new Headers();
    myHeaders.append("Accept-Encoding", "application/gzip");
    myHeaders.append("X-RapidAPI-Host", "google-translate1.p.rapidapi.com");
    myHeaders.append("X-RapidAPI-Key", "0b7abf8e78msha3ce1f6a5cc24ffp10e0bdjsn5c64b154c100");
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
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));


}
getLanguages();

//   var input = document.getElementById("movieText");
// input.addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//         alert('Working');
//     }
// });
