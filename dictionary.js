/*document.getElementById('file').onchange = function () {

    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function (progressEvent) {
        // Entire file
        console.log(this.result);

        // By lines
        var lines = this.result.split('\n');
        for (var line = 0; line < lines.length; line++) {
            console.log(lines[line]);
        }
    };
    reader.readAsText(file);
};
//let W = prompt("Please enter a word");

let pronunciation = "";
let identical = [];
let replacePhoneme = [];
let addPhoneme = [];
let removePhoneme = [];

function findLines() {
    var patt1 = /\s/g;
    var result = str.match(patt1);
    console.log(result);
}

*/
//-----------------------------------------------------------

//let results;
let fileArray;//array of the whole file
let filteredArray = [];//a file array with no special charactes
let userInput = "";// stores the user input from prompt
let matchingPhenomes = [];

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
 * 
 * @param {*} fileContentLoaded 
 */
function mainEntry(fileContentLoaded) {
    //        this is an example use
    console.log("Where the content is: ", fileContentLoaded.split("\n"))
    fileArray = fileContentLoaded.split("\n");//seperates elements in array at the new line
    //call method
    //do logic


    //results = splitOnSpace(fileArray[0]);

    //searchAllLines();
    //console.log(result)
}

/**
 * takes ling strings seperated by spaces, and creates an object out of the 
 * before string and after string
 * @param {The string of text to be split} line 
 */
function splitOnSpace(line) {
    // reset strings
    var obj = {
        before: "",
        after: ""
    }
    // accumulate before space
    var i = 0;
    while (i < line.length && line[i] != " ") { obj.before += line[i]; i++; }
    // skip the space
    i++;
    // accumulate after space
    while (i < line.length) { obj.after += line[i]; i++; }
    return obj;
}

/**
 * initiates the search when cumit button is pressed by prompting user for
 * input
 */
function startSearch() {
    let letters1 = /^[A-Za-z]+$/
    while (userInput == 0 || !userInput.match(letters1)) {
        userInput = prompt("Please enter a word");
    }
    filerArray();
    let result = searchAllLines(userInput);
    if (result != undefined) {
        searchAllLinesPhem(result.after);
    }
}

/**
 * 
 * @param {*} array 
 */
function filerArray() {
    let x = 0;//iterating through fileArray
    let i = 0;//iterates over filteredArray
    let filter = /[^a-zA-Z0-9'\s]/;
    //console.log(filter.test("2  9  9"));
    do {
        if (filter.test(fileArray[x]) === false) {
            filteredArray[i] = fileArray[x];
            i++;
            x++;
        } else {
            x++;
        }
    } while (x < 300); //while (x < fileArray.length);
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
            console.log("test found it!! \n >" + anwser.before + "\n Pronunciation:   " + anwser.after);
            //searchAllLinesPhem(answer.after);
            return anwser;
        }

    }
    console.log("could not find this word...");
}


function searchAllLinesPhem(phen) {

    console.log("this is the next seach function" + phen);

    /*let upperSearch = phen.toUpperCase();
    let x = 0;
    let anwser;//answer from first search of dictionary
    while (filteredArray.length > x) {
        if (filteredArray[x].search(upperSearch) == -1) {
            x++;
            continue;
        } else {
            anwser = splitOnSpace(filteredArray[x]);
            console.log("test found it!! \n >" + anwser.before + "\n Pronunciation:   " + anwser.after);
            //searchAllLinesPhem(answer.after);
            return anwser;
        }

    }
    console.log("could not find this word...");*/
}
