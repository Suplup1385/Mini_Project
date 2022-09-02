const totalPriceElement = document.getElementById("totalPrice");
const parentListElement = document.getElementById("list")

let totalPrice = 0.0;
let cart = [];

class Item {
  constructor(name, price){
    this.name = name;
    this.price = price;
  }
}

const totalPriceStorage = localStorage.getItem("totalPrice")
if (totalPriceStorage !== null) {
  totalPrice = parseFloat(totalPriceStorage);
}

//cartStorage is made up of pairs that need to be made into objects
const cartStorage = localStorage.getItem("cart")
if (cartStorage !== null) {
  cart = JSON.parse(cartStorage).map((item) => {
    return new Item(item.name, item.price);
  })
}

//put here to refresh the initial page
refreshUI();

function updateStorage(){
  localStorage.setItem("totalPrice",totalPrice);
  localStorage.setItem("cart",JSON.stringify(cart));
}

//changes only UI values
function refreshUI(){
  totalPriceElement.innerText = `Total Cost: $${totalPrice} | Total # of Items ${cart.length}`;
  parentListElement.innerHTML = "";
  
  cart.forEach((item,index) => {
    const listElement = document.createElement("li");
    const textNode = document.createTextNode(`${item.name} - $${item.price}`);
    listElement.appendChild(textNode);
    parentListElement.appendChild(listElement);
    listElement.classList.add("list-group-item","d-flex","justify-content-between");
  
    const deleteButton = document.createElement("button");
    const deleteTextNode = document.createTextNode("delete")
    deleteButton.appendChild(deleteTextNode);
    deleteButton.classList.add("btn","btn-danger");
    listElement.appendChild(deleteButton);
  
    deleteButton.addEventListener("click", () => {
      cart.splice(index,1);
      totalPrice -= item.price;
      updateStorage();
      refreshUI();
    })   
  })
}

//changes only internal values
function addItem(form){  
  const itemName = form.itemName.value;
  const itemPrice = form.itemPrice.value;

  if (itemName == "" || itemPrice == "" ){
    refreshUI();
    return false;
  }else{
    totalPrice += parseFloat(itemPrice);
    const item = new Item(itemName,parseFloat(itemPrice));
    cart.push(item);
  
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("cart", JSON.stringify(cart));
  
    updateStorage();
    refreshUI();

    return false
  }
}