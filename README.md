# Phonetic-Dictionary
Uses JavaScript to allow user to upload a text file and search for an word throughout the file

This project takes in a 133,314 line .txt document ("cmundict.txt") and searches for terms throughout the document using regular expression and other techniques.
The program works in several distinct phases:

      1)Use the DOM object to create event listeners for the upload file and submit buttons.

      2)Read and filter file when uploaded.

      3)Search for word when it is subitted.

      4)Search for words that sound exactally the same i.e. same phenology.

      5)Search for words that are have have same phenology length but one phoneme is changed.

      6)Search for words that have the same phenology with one extra phoneme added.


1) The HTML page has an event listener added to the file upload button. When there is a change the function "readSingleFile" is called. This function first declares 
an array of equal length to the input file and if there is content to be read will create a new FileReader object. The reader upon onload will call a nested function
where the contents of the event is loaded into a new variable "contents". This is then passed into another function 'mainEntry'. This function load each new line in
the .txt file as a string in to a new element in the 'fileArray'. Once there are no more lines to be checked the nested function will be exited and we will have a 
fileArray containing each line of the file as an element.

2) In the filtering stage the fileArray is 

