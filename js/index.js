const today = new Date();
let thisYear = today.getFullYear();
const inputForm = document.querySelector("form");
const resultsSection = document.querySelector("#results");
const resultsList = document.querySelector("ul");

inputForm?.addEventListener("submit", (submission) => {
  submission.preventDefault();
  resultsSection.style.display = "block";
  const userInput = submission.target?.userInput.value;
  // website used to generate template, can be used to specify other filters and data points as needed https://ecos.fws.gov/ecp/report/adhocCreator?catalogId=species&reportId=species&columns=%2Fspecies@cn,status&sort=%2Fspecies@cn%20asc&distinct=true&filter=%2Fspecies%2Fcurrent_range_county@name%20%3D%20%27Wake%27
  const fetchURL = `https://ecos.fws.gov/ecp/pullreports/catalog/species/report/species/export?format=json&distinct=true&columns=%2Fspecies%40cn%2Cstatus%2Cmore_info_url&sort=%2Fspecies%40cn%20asc&filter=%2Fspecies%2Fcurrent_range_county%40name%20%3D%20'${userInput}'`;
  fetch(`${fetchURL}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .then((responseJSON) => {
      const responseArray = responseJSON.data;
      console.log(responseArray);
      return responseArray;
    })
    .then((array) => {
      array.forEach(appendSpecies);
    })
    .catch((err) => {
      const species = document.createElement("li");
      species.innerHTML = `${err}`;
      resultsList?.appendChild(species);
    });
  inputForm?.reset();
});

function appendSpecies(element) {
  const [animal, status, url] = element;
  const species = document.createElement("li");
  let str = `${animal}, listed as ${status}`;
  if (url) {
    str += `<br>Here's a link to learn more: <a href="${url}" target="_blank" rel="noopener noreferrer"> ${url} </a>`;
  }
  species.innerHTML = str;
  resultsList?.appendChild(species);
}

///FOOTER///

const copyright = document.createElement("p");
copyright.innerHTML = `Amanda Hockmuth ${thisYear} &#169`;

const footer = document.createElement("footer");
footer.className = "footer";
footer.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
footer.style.boxShadow = "5px 2px 2px rgba(0, 0, 0, 0.2)";

const body = document.querySelector("body");

body?.appendChild(footer);
footer.appendChild(copyright);
