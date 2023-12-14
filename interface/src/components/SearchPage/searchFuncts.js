/*function pressedAlert(){
    alert("pressed");
}*/

function submitSearch(e){
    e.preventDefault();
    console.log(e.target.search.value);
}

export {submitSearch}