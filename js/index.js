const inputForm = document.querySelector("form");
const resultsSection = document.querySelector("#results");
const resultsList = document.querySelector("ul");

inputForm?.addEventListener("submit", (submission) => {
  submission.preventDefault();
  resultsSection.style.display = "block";
  const userInput = submission.target?.userInput.value;
  // website used to generate template https://ecos.fws.gov/ecp/report/adhocCreator?catalogId=species&reportId=species&columns=%2Fspecies@cn,status&sort=%2Fspecies@cn%20asc&distinct=true&filter=%2Fspecies%2Fcurrent_range_county@name%20%3D%20%27Wake%27
  // changed fetch url template below to temporarily return only common name and status incase the null more_info_url data points was throwing it off
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
      for (i = 0; i < array.length; i++) {
        const speciesData = array[i].toString();
        const species = document.createElement("li");
        // simplifying code to debug
        // const speciesCommonName = results[i].cn;
        // const speciesStatus = results[i].status;
        // const speciesURL = results[i].more_info_url;
        // species.innerHTML = `${speciesCommonName} is ${speciesStatus}. More information can be found on them here: ${speciesURL} (if available).`;
        species.innerHTML = `${speciesData}`;
        resultsList?.appendChild(species);
      }
    })
    .catch((err) => {
      const species = document.createElement("li");
      species.innerHTML = `${err}`;
      resultsList?.appendChild(species);
    });
  inputForm?.reset();
});

/*
TODO
Fix second "then" to return data to the results section [Since some of the species do not have a url, the data point is null, could that be throwing off my for loop?]
Deal with errors/instructions for submitting county names (possibly add state abbreviation input)
*/
