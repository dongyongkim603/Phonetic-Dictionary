
let fileArray;//array of the whole file
let filteredArray = [];//a file array with no special charactes
let userInput = "";// stores the user input from prompt
let matchingSounds = []; //an array of the matching sounding words
let searchAnswer;//the return value of the initial search
let addPhoneme = [];//contains the phase III add phoneme

//creates an event listener on the upload file button in HTML
document.getElementById('fileinput').addEventListener('change', readSingleFile, false);

/**
 * Takes in and reads a file from the upload button.
 * @param {The file that is uploaded by the user} uploadedFile 
 */
function readSingleFile(uploadedFile) {
    //Retrieve the first (and only!) File from the FileList object
    var file = uploadedFile.target.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var contents = e.target.result;
            //console.log("Where the content is: ", contents.split("\n"))
            mainEntry(contents);
        }
        console.log(reader.readAsText(file));
    } else {
        alert("Failed to load file");
    }
}

/**
 * parces through a .txt file and stores each new line in the document as an element
 * in an array
 * @param {*} fileContentLoaded 
 */
function mainEntry(fileContentLoaded) {
    console.log("Where the content is: ", fileContentLoaded.split("\n"))
    fileArray = fileContentLoaded.split("\n");//seperates elements in array at the new line
}

/**
 * takes ling strings seperated by spaces, and creates an object out of the 
 * before string and after string
 * @param {The string of text to be split} line 
 */
function splitOnSpace(line) {
    // reset strings
    var wordLineObjects = {
        before: "",
        after: ""
    }
    // accumulate before space
    var i = 0;
    while (i < line.length && line[i] != " ") { wordLineObjects.before += line[i]; i++; }
    // skip the space
    i++;
    // accumulate after space
    while (i < line.length) { wordLineObjects.after += line[i]; i++; }
    return wordLineObjects;
}

/**
 * initiates the search when cumit button is pressed by prompting user for
 * input
 */
function startSearch() {
    const letters1 = /^[A-Za-z]+$/;
    while (userInput == 0 || !userInput.match(letters1)) {
        userInput = prompt("Please enter a word");
    }
    filerArray();
    searchAnswer = searchAllLines(userInput);
    if (searchAnswer != undefined) {
        searchAllLinesPhem(searchAnswer.after);
    }
    printResults();
    searchLinesSimilar(searchAnswer.after);
}

/**
 * goes through the file string array and checks each line. if a line does not contain
 * any characters other than letters, numbers, whitespaces, or /'/'s, the line will be
 * placed in the filtered array
 * @param {takes an array of strings as an argument} array 
 */
function filerArray() {
    let x = 0;//iterating through fileArray
    let i = 0;//iterates over filteredArray
    const filter = /[^a-zA-Z0-9'\s]/;
    do {
        if (filter.test(fileArray[x]) === false) {
            filteredArray[i] = fileArray[x];
            i++;
            x++;
        } else {
            x++;
        }
    } while (x < fileArray.length); //while (x < fileArray.length);
    console.log("filteredArray is " + i + " and fileArray is " + x);
}

/**
 * iterates through a file array and looks to see if there is a match
 * @param {the string to be search for} searchTerm 
 */
function searchAllLines(searchTerm) {
    let upperSearch = searchTerm.toUpperCase();
    let x = 0;
    let anwser;//answer from first search of dictionary
    while (filteredArray.length > x) {
        if (filteredArray[x].search(upperSearch) == -1) {
            x++;
            continue;
        } else {
            anwser = splitOnSpace(filteredArray[x]);
            //console.log("test found it!! \n >" + anwser.before + "\n Pronunciation:   " + anwser.after);
            //searchAllLinesPhem(answer.after);
            return anwser;
        }

    }
    //console.log("could not find this word...");
}

/**
 * searches through an array of strings to find matching terms. Will add the matching
 * word objects to a new array. a match is based off of a match in phenetic spellings
 * @param {takes in a string of phenetic spelling} phen 
 */
function searchAllLinesPhem(phen) {

    //console.log("this is the next seach function" + phen);

    let upperSearch = phen.toUpperCase();
    let x = 0;
    let i = 0;
    let localAnswer
    while (filteredArray.length > x) {
        if (filteredArray[x].search(upperSearch) == -1) {
            x++;
            continue;
        } else {
            localAnswer = splitOnSpace(filteredArray[x]);
            matchingSounds[i] = localAnswer;
            i++;
            x++;
        }

    }
}

/**
 * 
 * @param {*} phen 
 */
function searchLinesSimilar(phen) {
    let splitPhen = []; //will hold the substring array from the split phen
    splitPhen = phen.split(" ");
    console.log(splitPhen.length + "this is the next searasdfch function" + + splitPhen[1] + splitPhen[2] + splitPhen[3]);
    let x = 0;
    let numberOfMatches = 0;
    const lengthOfPhenArray = splitPhen.length;
    console.log(splitPhen[1]);
    do {
        numberOfMatches = 1;
        splitPhen.forEach(element => {
            if (filteredArray[x].search(element) != -1 && numberOfMatches != lengthOfPhenArray - 1) {
                numberOfMatches++;
            } else if (numberOfMatches == lengthOfPhenArray - 1) {
                console.log("yesssss match");
                addPhoneme = filteredArray[x];
            }
        });
        x++;
    } while (filteredArray.length > x);
    console.log(addPhoneme.length);
}

/**
 * prints the results of the search and its matching phenomes
 */
function printResults() {
    let i = 0;
    let concatinatedString = "";
    while (i < matchingSounds.length) {
        concatinatedString += `${matchingSounds[i].before} `;
        i++;
    }
    console.log(`>${searchAnswer.before} \n \nPronunciation:   ${searchAnswer.after} \n \nIdentical ${concatinatedString}`);
}
