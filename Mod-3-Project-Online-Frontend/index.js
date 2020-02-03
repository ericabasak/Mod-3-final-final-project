window.addEventListener('DOMContentLoaded', function() {
  console.log("page loaded from script");

  fetch_pairings();
  const form = document.querySelector("#pairing-form")
  const list = document.querySelector("#list")
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    // console.log(e.target.comment.value);
    const createNewPairing = e.target.comment.value;
    
    const newList = document.querySelector("#list")
    list.insertAdjacentHTML("beforeend", `<li>${createNewPairing}</li>`)
    e.target.reset();
  })

  function showWineDropdown() {
    document.querySelector("#wine-section").classList.toggle('hidden');
  }

  function showChocolateDropdown() {
    document.querySelector("#chocolate-section").classList.toggle('hidden')
  }

  document.querySelector("#wine-btn").addEventListener('click', e => {
    e.preventDefault();
    showWineDropdown();
  });

  document.querySelector("#chocolate-btn").addEventListener('click', e => {
    e.preventDefault();
    showChocolateDropdown();
  });

  // fetch all the wines from database
  fetch('http://localhost:3000/api/v1/wines')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let selectElem = document.getElementById("wine-section");
    data.forEach(function(e) {
      let optionElem = document.createElement('option');
      optionElem.innerHTML = e.name
      selectElem.appendChild(optionElem);
    });

    selectElem.addEventListener('change', function(e) {
      e.preventDefault();
      document.querySelector("#chocolate-section").classList.remove('hidden');
    })
    
    // fetch all chocolates from database
    fetch('http://localhost:3000/api/v1/chocolates')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let cocoSection = document.getElementById("chocolate-section")
      data.forEach(function(e) {
        let newChoc = document.createElement('option');
        newChoc.innerHTML = e.name
        cocoSection.appendChild(newChoc);
      })
    });
  });

// fetch all wine and chocolate pairings
function fetch_pairings() {
  fetch('http://localhost:3000/api/v1/pairings')
  .then(function(resp){
    return resp.json()
  })
  .then(function(data){
    console.log(data);
    ulSection = document.getElementById("pairings")

    for(let i=0; i< data.wines.length; i++) {
      let w = data.wines[i]
      let c = data.chocolates[i]
      let liElem = document.createElement("li");
      let heartBtn = document.createElement("button");
      let deleteBtn = document.createElement("button");
      liElem.setAttribute("pairing_id", data.ids[i]);
      // data.ids.forEach((id) => {
      //   liElem.dataset.pairingID = id
      // })
      heartBtn.dataset.id = "Like Button"
      deleteBtn.dataset.id = "Delete Button"
      liElem.innerHTML = w.name + " goes well with " + c.name + "!"
      heartBtn.innerHTML = `❤️ <span>0</span> Likes`;
      deleteBtn.innerText = "Delete"
      ulSection.appendChild(liElem);
      liElem.append(heartBtn)
      liElem.append(deleteBtn);
    }
  })
}


// get the delete button to delete an individual pairing
let parentUl = document.querySelector("#pairings");
parentUl.addEventListener("click", function(e) {
  // console.log(e)
  // console.log(e.target.dataset.id)
  if(e.target.dataset.id === "Delete Button") {
    // console.log(e.target.parentNode.getAttribute("pairing_id"))
    console.log(e) //#1
    let targetObj = e.target
    console.log(targetObj) //#2
    let parentLI = targetObj.parentNode
    console.log(parentLI)
    e.target.parentNode.remove()
    deletePairing(e.target.parentNode.getAttribute("pairing_id"))
  } else if (e.target.dataset.id === "Like Button"){
    let likeNum = parseInt(e.target.getElementsByTagName("span")[0].innerHTML);
    likeNum = likeNum + 1
    e.target.getElementsByTagName("span")[0].innerHTML = likeNum
    
  }
  pairingLikes(e.target.dataset.id, e.target.getElementsByTagName("span")[0].innerHTML)
})


function handleCreateNewPairBtn() {
  const newBtn = document.querySelector("#newPairing")
  newBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const newWValue = document.querySelector("#wine-section").value
    const newCValue = document.querySelector("#chocolate-section").value
    fetch("http://localhost:3000/api/v1/pairings", 
    {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        wine: newWValue,
        chocolate: newCValue
      })
    })
  })
}
handleCreateNewPairBtn();


// delete pairing function
function deletePairing(id) {
  let btn = document.querySelector("#delete")
  fetch(`http://localhost:3000/api/v1/pairings/${id}`, 
  {
    method: "DELETE",
    headers: 
    {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
  })
}


// persist the likes to the database
function pairingLikes(id, likes) {
  fetch(`http://localhost:3000/api/v1/pairings/${id}`, {
    method: "PATCH",
    headers: 
    {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify({likes: likes})
  })
  .then(function(response) {
    return response.json()
  })
}



// THE END
}); 
