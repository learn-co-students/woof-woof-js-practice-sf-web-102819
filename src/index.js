const dogBar = document.querySelector("#dog-bar")
const dogSummary = document.querySelector("#dog-summary-container")
const goodDogButton = document.querySelector("#good-dog-filter")

document.addEventListener("DOMContentLoaded", () => {
    grabDogs()

    function grabDogs() {
        fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(json => {
            json.forEach(element => render(element))
        })
    }

    function render(element) {
        let dog = document.createElement("span")
        dog.setAttribute("id", element.id)
        dog.innerText = `${element.name}`
        dogBar.appendChild(dog)
        seeMoreDog(dog, element)
    }

    function seeMoreDog(dog, element){
        dog.addEventListener("click", () => {
            if (element.isGoodDog == true){
                var goodBoy = "Good Dog!"
                var toggleValue = false}
            else {
                var goodBoy = "Bad Dog!"
                var toggleValue = true}
            let dogInfo = document.createElement("div")
            dogInfo.innerHTML = `
            <h2> ${element.name} </h2>
            <img src=${element.image} height=200 /> <br>
            <button type="button" id="toggle-${element.id}"> ${goodBoy} </button>
            `
            dogSummary.innerHTML = ""
            dogSummary.appendChild(dogInfo)

            
            document.querySelector(`#toggle-${element.id}`).addEventListener("click", () =>{
                dogObject = {
                    method: "PATCH",
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
          
                    },
                    body: JSON.stringify({isGoodDog: toggleValue})
                }

                fetch(`http://localhost:3000/pups/${element.id}`, dogObject)
                .then(res => res.json())
                .then( json => {
                    console.log(document.querySelector(`#toggle-${element.id}`).innerText)
                    if (document.querySelector(`#toggle-${element.id}`).innerText == "Good Dog!") {
                    document.querySelector(`#toggle-${element.id}`).innerText = "Bad Dog!"}
                    else {
                    document.querySelector(`#toggle-${element.id}`).innerText = "Good Dog!"}
                }) // last fetch
        }) // second to last event listenr
        
    
    }) }//see more dog

    
}) //dom content loaded end

