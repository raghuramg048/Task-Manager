const contain = document.getElementById("empty");
let count = 1;
let color = "color1";

function add(title = "", content = "", savedColor = null) {
  if (savedColor) {
    color = savedColor;
  } else {
    switch (count % 5) {
      case 0:
        color = "color1";
        break;
      case 1:
        color = "color2";
        break;
      case 2:
        color = "color3";
        break;
      case 3:
        color = "color4";
        break;
      case 4:
        color = "color5";
        break;
    }
  }

  const newCard = document.createElement("div");
  newCard.className = "card";
  newCard.id = color;

  const tool = document.createElement("div");
  tool.className = "tool";

  const save = document.createElement("button");
  save.onclick = saveCards;

  const img = document.createElement("img");
  img.src = "./save1.png";

  const button = document.createElement("button");
  button.onclick = function () {
    remove(this);
  };

  const image = document.createElement("img");
  image.src = "./remove1.png";

  const head = document.createElement("input");
  head.type = "text";
  head.placeholder = "task title";
  head.className = "head";
  head.value = title;

  const space = document.createElement("div");
  space.contentEditable = "true";
  space.className = "space";
  space.innerHTML = content;

  save.appendChild(img);
  button.appendChild(image);

  tool.appendChild(save);
  tool.appendChild(button);

  newCard.appendChild(tool);
  newCard.appendChild(head);
  newCard.appendChild(space);

  contain.before(newCard);

  count++;
}

function remove(clickedElement) {
  clickedElement.closest(".card").remove();
  saveCards();
}

function saveCards() {
  const cards = document.querySelectorAll(".card");
  const data = [];

  cards.forEach((card) => {
    const title = card.querySelector(".head").value;
    const content = card.querySelector(".space").innerHTML;
    const color = card.id;

    data.push({
      title: title,
      content: content,
      color: color,
    });
  });

  localStorage.setItem("cards", JSON.stringify(data));
}

function loadCards() {
  const savedCards = JSON.parse(localStorage.getItem("cards")) || [];

  savedCards.forEach((card) => {
    add(card.title, card.content, card.color);
  });
}

window.onload = loadCards;
