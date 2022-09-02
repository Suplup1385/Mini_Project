const parent = document.getElementById("buttons");
const outcome = document.getElementById("outcome");
const opponentChoice = document.getElementById("opponentChoice");
const buttons = [];

for (let i = 0; i < 3; i++){
  const button = document.createElement("button");
 
  if (i == 0){
    const buttonText = document.createTextNode("rock")
    button.appendChild(buttonText);
    button.classList.add("btn","btn-secondary");
    button.setAttribute("id","rock");
  }else if (i == 1){
    const buttonText = document.createTextNode("paper")
    button.appendChild(buttonText);
    button.classList.add("btn","btn-light");
    button.setAttribute("id","paper");
  }else{
    const buttonText = document.createTextNode("scissors")
    button.appendChild(buttonText);
    button.classList.add("btn","btn-danger");
    button.setAttribute("id","scissors");
  }
  parent.appendChild(button);
  buttons.push(button);
}

// 35% rock 45% scissors 20% paper
function generateOpposition(){
  while (opponentChoice.firstChild){
    opponentChoice.removeChild(opponentChoice.firstChild);
  }
  
  let opposition = Math.floor(Math.random() * 101);
  const button = document.createElement("button");
  
  if (opposition >= 0 && opposition <= 34){
    opposition = "rock";
    
    const buttonText = document.createTextNode("rock")
    button.appendChild(buttonText);
    button.classList.add("btn","btn-secondary");
  }else if (opposition >= 35 && opposition <= 81){
    opposition = "scissors";

    const buttonText = document.createTextNode("scissors")
    button.appendChild(buttonText);
    button.classList.add("btn","btn-danger");
  }else{
    opposition = "paper";

    const buttonText = document.createTextNode("paper")
    button.appendChild(buttonText);
    button.classList.add("btn","btn-light");
  }
  opponentChoice.appendChild(button);
  
  return opposition;
}

function calculateWinner(opposition, button){
  if (button.id == "rock"){
    if (opposition == "rock"){
      console.log("tie");
      outcome.innerHTML = "tie";
      outcome.style.color = "gray";
    }else if (opposition == "paper"){
      console.log("lose");
      outcome.innerHTML = "lose";
      outcome.style.color = "red";
    }else{
      console.log("win");
      outcome.innerHTML = "win";
      outcome.style.color = "green";
    }
  }else if (button == "paper"){
    if (opposition == "rock"){
      console.log("win");
      outcome.innerHTML = "win";
      outcome.style.color = "green";
    }else if (opposition == "paper"){
      console.log("tie");
      outcome.innerHTML = "tie";
      outcome.style.color = "gray";
    }else{
      console.log("lose");
      outcome.innerHTML = "lose";
      outcome.style.color = "red";
    }
  }else{
    if (opposition == "rock"){
      console.log("lose");
      outcome.innerHTML = "lose";
      outcome.style.color = "red";
    }else if (opposition == "paper"){
      console.log("win");
      outcome.innerHTML = "win";
      outcome.style.color = "green";
    }else{
      console.log("tie");
      outcome.innerHTML = "tie";
      outcome.style.color = "gray";
    }
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    calculateWinner(generateOpposition(), button);
  })
})