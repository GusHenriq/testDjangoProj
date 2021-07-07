// 4 query selectors to grab the needed html elements. This is what we will be manipulating with JS
const firstName = document.querySelector('#fName');
const lastName = document.querySelector('#lName');
const fNameHeader = document.querySelector('#fNameHeader');
const lNameHeader = document.querySelector('#lNameHeader');

// adds event listeners on the 2 entry boxes. On every 'input' the updateHeaders function is run
firstName.addEventListener('input', updateHeaders);
lastName.addEventListener('input', updateHeaders);

// updateHeaders that puts whatever text is in the textboxes into the cooresponding h2 tag
function updateHeaders(){
    //console.log(firstName.value);
    fNameHeader.innerHTML = firstName.value;
    lNameHeader.innerHTML = lastName.value;
}