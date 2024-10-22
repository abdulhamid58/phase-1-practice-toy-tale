let addToy = false;
const collection = document.getElementById("toy-collection");
const form = document.querySelector(".add-toy-form");


document.addEventListener("DOMContentLoaded", () => {
 const addBtn = document.querySelector("#new-toy-btn");
 const toyFormContainer = document.querySelector(".container");
 addBtn.addEventListener("click", () => {
   // hide & seek with the form
   addToy = !addToy;
   if (addToy) {
     toyFormContainer.style.display = "block";
   } else {
     toyFormContainer.style.display = "none";
   }
 });
});


function fetchToys() {
 fetch("http://localhost:3000/toys")
   .then((res) => res.json())
   .then((toys) => appendToys(toys));
}


function appendToys(toys) {
 toys.forEach((toy) => {
   const card = document.createElement("div");
   let likes = toy.likes;
   card.className = "card";
   card.innerHTML = `
<h2>${toy.name}</h2>
<img src="${toy.image}" class="toy-avatar" />
<p id='likes-${toy.id}'>${likes} Likes</p>
<button class="like-btn" id="button-${toy.id}">Like ❤️</button>`;
   collection.appendChild(card);
   const button = document.querySelector(`#button-${toy.id}`);
   const likesText = document.querySelector(`#likes-${toy.id}`);


   button.addEventListener("click", () => {
     updateLikes(toy.id, likes, likesText);
    });
  });
 }
 
 
 function handleAddToy(toyObj) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toyObj),
  }).then((res) => res.json());
 }
 
 
 form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.querySelector("#name-input").value;
  const image = form.querySelector("#image-input").value;
  console.log(name, image);
  const obj = {
    name,
    image,
    likes: 0,
  };
  handleAddToy(obj);
  fetchToys();
 });
 
 
 function updateLikes(id, likes, likesText) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: (likes += 1),
    }),
  }).then((res) => {
    if (res.ok) {
      likesText.textContent = `${likes} Likes`;
    }
  });
 }
 
 
 fetchToys();
 
 
  
