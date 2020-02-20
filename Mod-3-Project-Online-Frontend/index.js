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
   fetchWines() {
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
  fetchChocolates() {
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
  fetchPairings(isSorted) {
    let that = this;
    fetch('http://localhost:3000/api/v1/pairings')
    .then(function(resp){
      return resp.json()
    })
    .then(function(data) {
      console.log(data);
      let allData = [];
      for(let i=0; i< data.wines.length; i++) {
        allData.push({
          wine: data.wines[i],
          chocolate: data.chocolates[i],
          like: data.likes[i],
          id: data.ids[i]
        })
      }
      if (isSorted) {
       allData.sort((a, b) => (a.like > b.like) ? -1 : 1)
      }
      console.log(allData);
      that.ulSection.innerHTML = "";
      for(let i=0; i< allData.length; i++) {
            let w = allData[i].wine
            let c = allData[i].chocolate
            let heartBtn = document.createElement("button");
            let deleteBtn = document.createElement("button");
            let liElem = document.createElement("li");
            liElem.setAttribute(that.pairing_id, allData[i].id);

            heartBtn.dataset.id = "Like Button"
            deleteBtn.dataset.id = "Delete Button"
            liElem.innerHTML = w.name + " goes well with " + c.name + "!"
            let like = 0;
            if (allData[i].like) {
              like = allData[i].like
            }
            // heartBtn.innerHTML = `❤️ <span>${like}</span> Likes`;
            heartBtn.innerHTML = `<span>${like}</span>Likes`;
            deleteBtn.innerText = "Delete"
            that.ulSection.appendChild(liElem);
            liElem.append(heartBtn);
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
        that.fetchPairings(false)
      })
    })
  }

  // delete pairing function
  deletePairing(id) {
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
  pairingLikes(id, likes) {
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

  handleLikesAndDeletes() {
    let that = this;
    // get the delete button to delete an individual pairing OR increase the likes
    let parentUl = document.querySelector("#pairings");
    parentUl.addEventListener("click", e => {
      console.log("clicked")

      if(e.target.dataset.id === "Delete Button") {
        // console.log(e.target.parentNode.getAttribute("pairing_id"))
        let targetObj = e.target
        let parentLI = targetObj.parentNode
        e.target.parentNode.remove()
        that.deletePairing(e.target.parentNode.getAttribute("pairing_id"))
      } else if (e.target.dataset.id === "Like Button"){
        let likeNum = parseInt(e.target.getElementsByTagName("span")[0].innerHTML);
        likeNum = likeNum + 1
        e.target.getElementsByTagName("span")[0].innerHTML = likeNum
        that.pairingLikes(e.target.parentNode.getAttribute('pairing_id'), 
        e.target.childNodes[0].innerHTML)
      }    
    })
  }

}
// end of class

document.addEventListener('DOMContentLoaded', function() {
  console.log("page loaded from script");

  let c = new Controller()
  c.showWineDropdown()
  c.showChocolateDropdown()
  c.fetchWines()
  c.fetchChocolates()
  c.fetchPairings(false)
  c.handleCreateNewPairBtn()
  c.handleLikesAndDeletes()
  addWineButtonHandler()

  function addWineButtonHandler() {
    document.querySelector("#wine-btn").addEventListener('click',  e => {
      e.preventDefault();
      c.showWineDropdown();
    });
  }

  document.querySelector("#chocolate-btn").addEventListener('click', e => {
    e.preventDefault();
    c.showChocolateDropdown();
  });

  document.querySelector("#high-low-btn").addEventListener("click", e => {
    e.preventDefault();
    c.fetchPairings(true);
  })

// THE END
});
