//https://icanhazdadjoke.com/api
// the jokes api docs

const jokesPg = document.querySelector(".jokes-container");

fetch("https://icanhazdadjoke.com/slack")
  .then((data) => data.json())
  .then((jokeData) => {
    const jokeText = jokeData.attachments[0].text;
    jokesPg.textContent = jokeText;
  });
