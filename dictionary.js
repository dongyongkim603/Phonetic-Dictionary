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
let userInput = "";
/**
 * 
 * @param {*} evt 
 */
function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var file = evt.target.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var contents = e.target.result;
            //console.log("Where the content is: ", contents.split("\n"))
            mainEntry(contents);


            console.log(results);//


        }
        console.log(reader.readAsText(file));
    } else {
        alert("Failed to load file");
    }
}

document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
//document.getElementById('submit').addEventListener('click', searchAllLines);

/**
 * 
 * @param {*} fileContentLoaded 
 */
function mainEntry(fileContentLoaded) {
    //        this is an example use
    console.log("Where the content is: ", fileContentLoaded.split("\n"))
    fileArray = fileContentLoaded.split("\n");
    //call method
    //do logic


    results = splitOnSpace(fileArray[0]);

    //searchAllLines();
    //console.log(result)
}

/**
 * 
 * @param {*} s 
 */
function splitOnSpace(s) {
    // reset strings
    var obj = {
        before: "",
        after: ""
    }
    // accumulate before space
    var i = 0;
    while (i < s.length && s[i] != " ") { obj.before += s[i]; i++; }
    // skip the space
    i++;
    // accumulate after space
    while (i < s.length) { obj.after += s[i]; i++; }
    return obj;
}

/**
 * 
 */
function searchAllLines() {
    let letters = /^[A-Za-z]+$/
    while (userInput == 0 || !userInput.match(letters)) {
        userInput = prompt("Please enter a word");
    }
    userInput.toLowerCase();
    let x = 0;
    console.log(results.length);
    while (fileArray.length > x) {
        let anwser;
        if (fileArray[x].match(userInput) == false) {
            x++;
        } else {
            anwser = fileArray[x];
            console.log("test found it!!" + anwser);
            break;
        }
    }
    console.log(answer.before + answer.after);
}
