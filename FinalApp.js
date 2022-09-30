let quotes = document.getElementById("quotes");
let btn = document.getElementById("btn");
let btn1 = document.getElementById("btn1");
let author = document.getElementById("author");
let copy = document.getElementById("copy");
let saveq = document.getElementById("saveq");

// fetch api from url
async function FetchQuotesApi() {
  
    await fetch("https://api.quotable.io/random")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //handle data
      author.innerText = "- " + data.author;
      quotes.innerText = data.content;
      return data.author, data.content;
    })
    .catch((error) => {
      //handle error
    });
}

//click to copy Quotes
function clickToCopy() {
  quotescopy = quotes.innerText;
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = quotescopy;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  setTimeout(() => {
    copy.innerText = "Copied successful";
  }, 0);
  setTimeout(() => {
    copy.innerText = "";
  }, 1500);
}

//click to copy saved Quotes
function CopySavedQuotes(index) {
    let SaveQuote = localStorage.getItem("Quotes");
    
    if (SaveQuote == null) {
       QuotesArray = [];
        QuotesObj = {};
     } else {
            QuotesArray = JSON.parse(SaveQuote);
      }
  quotescopy = QuotesArray[index].quo;
  let elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = quotescopy;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  setTimeout(() => {
      document.getElementsByClassName('sm-text1')[index].innerText = 'Copied Successful';
  }, 0);
  setTimeout(() => {
      document.getElementsByClassName('sm-text1')[index].innerText = '';
  }, 2000);
}

// showing quotes from api using FetchQuotesApi
FetchQuotesApi();

// add to quotes function its save quotes in localstorage
function addquotes() {
  let SaveQuote = localStorage.getItem("Quotes");
  let flag = 1;

  if (SaveQuote == null) {
    QuotesArray = [];
    QuotesObj = {};
  } else {
    QuotesArray = JSON.parse(SaveQuote);
  }
  for (let i = 0; i < QuotesArray.length; i++) {
    let element = QuotesArray[i];
      if(element.quo === quotes.innerText)
      {
        flag=0;
        break;
      }
      else
      {
        flag=1;
      }
  }
  if(flag==1)
  {
    QuotesObj = {quo : quotes.innerText,athor : author.innerText};
    QuotesArray.push(QuotesObj);
    localStorage.setItem("Quotes", JSON.stringify(QuotesArray));
    showQuotes();
    setTimeout(() => {
      copy.innerText = "Quote Saved";
    }, 0);
    setTimeout(() => {
      copy.innerText = "";
    }, 1500);
  }
  else{
    setTimeout(() => {
      copy.innerText = "Quote Saved";
    }, 0);
    setTimeout(() => {
      copy.innerText = "";
    }, 1500);
  }
}

// create showQuotes for show quotes
function showQuotes() {
    let SaveQuote = localStorage.getItem("Quotes");
    
      if (SaveQuote == null) {
        QuotesArray = [];
        QuotesObj = {};
      } else {
        QuotesArray = JSON.parse(SaveQuote);
      }
  let show = "";
  QuotesArray.forEach(function (element, index) {
    show += `
        <div class = "saveQuotes">
        <div>
        <p class="sm-text2">${element.quo}</p>
        <p class="s-text">${element.athor}</p>
        <p class="sm-text1"></p>
        </div>
        <div class="flex">
        <button id=${index} class='btn1' onclick=deleteQuotes(this.id)>Unsave Quote</button>
        <button class='btn' onclick="CopySavedQuotes('${index}')">Copy Quote</button>
        </div>
        </div>
        `;
  });
  if (QuotesArray != "") {
    saveq.innerHTML = show;
  } else {
    saveq.innerHTML = '<p class="sm-text">No quotes saved yet</p>';
  }
}

// click to delete saved quotes
function deleteQuotes(index) {
  let SaveQuote = localStorage.getItem("Quotes");

  if (SaveQuote == null) {
    QuotesArray = [];
    QuotesObj = {};
  } else {
    QuotesArray = JSON.parse(SaveQuote);
  }
  let DeletedArray = QuotesArray.splice(index, 1);
  console.log(DeletedArray);
  localStorage.setItem("Quotes", JSON.stringify(QuotesArray));
  showQuotes();
}

// Refresh api to click button
btn.addEventListener("click", () => {
  FetchQuotesApi();
});

// click to button to call addquotes function
btn1.addEventListener("click", () => {
  addquotes();
});

//click to copy
quotes.addEventListener("click", () => {
  clickToCopy();
});

// call showQuotes function to show save Quotes
showQuotes();
