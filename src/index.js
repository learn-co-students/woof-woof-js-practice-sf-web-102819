const url = "http://localhost:3000/pups"

let dogContainer = document.querySelector("#dog-bar")
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")



document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault(); // just in case
    fetchDogs();
} )



function fetchDogs() {

    fetch(url)
        .then(resp => resp.json())
        .then(json => {

            for (i = 0; i < json.length; i++) {
                dogBar.innerHTML += (`<span class='hey-world' id='${json[i].id}'>${json[i].name} </span>`)
          } 
            
            let dogButtons = document.getElementsByClassName('hey-world')

            for (i = 0; i < dogButtons.length; i++) {

                dogButtons[i].addEventListener("click", (event) => {
                    fetch (`${url}/${event.target.id}`)
                    .then(resp => resp.json())
                    .then(json => dogInfo.innerHTML = (`<img src='${json.image}'></img>`) )
                } )
            }
        } )
}
