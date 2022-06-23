// Some constants I'll use throughout this code
// const wordTableID = 'wordTable';
// const textAreaID = 'textArea';
// Function resetArea()
function resetArea() {
  location.reload();
}

// Function countWords()
function countWords() {
  let lorem = document.getElementById("textArea").value;
  removeTable('wordTable');
  // Remove comas:
  // lorem = lorem.replace(/\.|,/g,'');
  // Splits the string into an array of words
  // const words = array => array.split(" ");
  // After watching the solution video, the way to remove comas and full stops AFTER splitting the string, is by using MAP:
  // - trim(): remove trailing spaces at the beginning and at the end
  // - split(" "): convert the string into an array of words
  // - replace(",", ""): Remove comas from each word
  // - replace(".", ""): Remove stops from each word
  const words = array => array.trim().split(" ").map(item => item.replace(",","")).map(item => item.replace(".", ""));

   // Get the number of words in the text:
  let wordsArray = words(lorem);
  // Remove any additional space (i.e. any double (or more) space between words is not removed with trim())
  wordsArray = wordsArray.filter(Boolean);

  console.log(wordsArray);
  if (wordsArray.length == 1 & wordsArray.includes('')) {
    wordsArray = [];
  }
  let nWords = wordsArray.length;

  document.getElementById("countOfWords").textContent = nWords;
 
  // wordCount is a sorted array containing all words and their occurrences
  let wordCount = wordFrequency(wordsArray);
  console.log(wordCount);
  console.log(!wordCount.length);
  if (wordCount.length) {
    document.getElementById("mostRepeatedWord").textContent ='"' + wordCount[0][0] + '" ('+wordCount[0][1]+')';
    printOutList(wordCount);
  }

  // console.log(wordCount);
};


// Function to count the number of occurrences of each word

const wordFrequency = wordArray => {
  let uniqueSet = new Set(wordArray);
  let counterWord = {...uniqueSet}
  uniqueSet.forEach((word) => {
    counterWord[word] = wordArray.filter(word_i => word_i === word).length;
    });

  // Turn counterWord object into an array of arrays
  let arrayOfWords = Object.entries(counterWord);
  // Sort the arrays based on the count number
  let sortedArray = arrayOfWords.sort((a,b) => b[1]-a[1]);
  
  return sortedArray;
}

// Another option to defined wordFrequency (as shown in the class video)
// const wordFrequency = wordArray => {
//   list = {};
//   wordArray.map(item => list[item] ? list[item]++ : list[item]=1)
//   return list;
// }

// Create a table with the words and their occurrences
function printOutList(arrayWithWords) {
  let table = document.createElement('table');
  table.setAttribute('id', 'wordTable');
  table.setAttribute('class', 'table table-hover');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  
  table.appendChild(thead);
  table.appendChild(tbody);
  
  // Adding the entire table to the body tag
  document.getElementById('wordTableRoot').appendChild(table);
  
  
  // Creating and adding table header
  let row0 = document.createElement('tr');
  let word_heading = document.createElement('th');
  word_heading.innerHTML = "Word";
  let count_heading = document.createElement('th');
  count_heading.innerHTML = "Occurrence";
  row0.appendChild(word_heading);
  row0.appendChild(count_heading);
  thead.appendChild(row0);
  
  arrayWithWords.forEach( (word_i) => {
    console.log(word_i);
    let row = document.createElement('tr');
    let row_word = document.createElement('td');
    row_word.innerHTML = word_i[0];
    let row_count = document.createElement('td');
    row_count.innerHTML = word_i[1];
    row.appendChild(row_word);
    row.appendChild(row_count);
    tbody.appendChild(row);
  });
  
};

// Clean the Word Occurrence table everytime the CountWords button is clicked:
function removeTable(id)
    {
        var tbl = document.getElementById(id);
        if(tbl) tbl.parentNode.removeChild(tbl);
    }


