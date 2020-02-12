class Controller {
  constructor() {

    // class variable - any class function can access
    this.ulSection = document.getElementById("pairings")
    this.pairing_id = "pairing_id"
  }

  showWineDropdown() {
    document.querySelector("#wine-section").classList.toggle('hidden');
  }

  showChocolateDropdown() {
    document.querySelector("#chocolate-section").classList.toggle('hidden')
  }

  // fetch all wines
   fetch_wines() {
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
      });
    })
  }

  // fetch all the chocolates
  fetch_chocolates() {
    fetch('http://localhost:3000/api/v1/chocolates')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let cocoSection = document.getElementById("chocolate-section");
      data.forEach(function(e) {
        let newChoc = document.createElement('option');
        newChoc.innerHTML = e.name
        cocoSection.appendChild(newChoc);
      });
    });
  };

  // fetch all wine and chocolate pairings
  fetch_pairings() {
    let that = this;
    fetch('http://localhost:3000/api/v1/pairings')
    .then(function(resp){
      return resp.json()
    })
    .then(function(data){
      console.log(data);
      that.ulSection.innerHTML = "";
          for(let i=0; i< data.wines.length; i++) {
            let w = data.wines[i]
            let c = data.chocolates[i]
            let liElem = document.createElement("li");
            let heartBtn = document.createElement("button");
            let deleteBtn = document.createElement("button");
            liElem.setAttribute(that.pairing_id, data.ids[i]);
            heartBtn.dataset.id = "Like Button"
            deleteBtn.dataset.id = "Delete Button"
            liElem.innerHTML = w.name + " goes well with " + c.name + "!"
            let like = 0;
            if (data.likes[i]) {
              like = data.likes[i]
            }
            heartBtn.innerHTML = `❤️ <span>${like}</span> Likes`;
            deleteBtn.innerText = "Delete"
            that.ulSection.appendChild(liElem);
            liElem.append(heartBtn)
            liElem.append(deleteBtn);
          }
      })
  }

  handleCreateNewPairBtn() {
    let that = this;
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
      .then(function(resp) {
        console.log("success", resp)
        that.fetch_pairings()
      })
    })
  }
}
// end of class

document.addEventListener('DOMContentLoaded', function() {
  console.log("page loaded from script");

  let c = new Controller()
  c.showWineDropdown()
  c.showChocolateDropdown()
  c.fetch_wines()
  c.fetch_chocolates()
  c.fetch_pairings()
  c.handleCreateNewPairBtn()

  document.querySelector("#wine-btn").addEventListener('click',  e => {
    e.preventDefault();
    c.showWineDropdown();
  });

  document.querySelector("#chocolate-btn").addEventListener('click', e => {
    e.preventDefault();
    c.showChocolateDropdown();
  });

  // get the delete button to delete an individual pairing OR increase the likes
  let parentUl = document.querySelector("#pairings");
  parentUl.addEventListener("click", e => {
    if(e.target.dataset.id === "Delete Button") {
      // console.log(e.target.parentNode.getAttribute("pairing_id"))
      let targetObj = e.target
      let parentLI = targetObj.parentNode
      e.target.parentNode.remove()
      deletePairing(e.target.parentNode.getAttribute("pairing_id"))
    } else if (e.target.dataset.id === "Like Button"){
      let likeNum = parseInt(e.target.getElementsByTagName("span")[0].innerHTML);
      likeNum = likeNum + 1
      e.target.getElementsByTagName("span")[0].innerHTML = likeNum
      pairingLikes(e.target.parentNode.getAttribute('pairing_id'), 
      e.target.childNodes[0].innerHTML)
    }    
  })

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
