

const buttonSearch = document.getElementById("buttonSearch");
// Recommentations based on user input Search

buttonSearch.addEventListener("click", () => {
  const input = document.getElementById("inputSearch");
  const resultSearch = document.getElementById("resultSearch");
  const content = document.getElementById("divContent");
  let valor = input.value.toLowerCase().trim();
  content.style.display = "none"; // Oculta el contenido al iniciar la búsqueda
  let resultsHtml  = ""; 

  fetch('./travel_reccommendation_api.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.beaches);
       if (/^beach(es)?$/.test(valor)) {
         data.beaches.forEach(beach => {
        resultsHtml += `<div class="card">
        <img src="${beach.imageUrl}" alt="${beach.name}"> 
        <h3>${beach.name}</h3>
        <p>${beach.description}</p>
        </div>`;
        });
    resultSearch.innerHTML = resultsHtml;
     } 
      else if (/^temple(s)?$/.test(valor)) {
        data.temples.forEach(temple => {
        resultsHtml += `<div class="card">
        <img src="${temple.imageUrl}" alt="${temple.name}">
        <h3>${temple.name}</h3>
        <p>${temple.description}</p>
        </div>`;
        });
        resultSearch.innerHTML = resultsHtml;
      } 
  else if ("japan" === valor||"australia" === valor||"brazil" === valor) {
     console.log(valor);
    data.countries.forEach( country =>{  
      if (country.name.toLowerCase() === valor) 
      { resultsHtml += `<div class="card">`
        country.cities.forEach(city => {
         resultsHtml += `<img class="card-img" src="${city.imageUrl}" alt="${city.name}">
        <h3>${city.name}</h3>
        <p >${city.description}</p>
        </div>`;
        });
      }
       }); 
      resultSearch.innerHTML = resultsHtml;
      }
  }) //Final del then data
  .catch (error => console.error('Error fetching recommendations:', error));


}); //final del evento click

const buttonReset = document.getElementById("buttonReset"); 
buttonReset.addEventListener("click", () => { 
  const resultSearch = document.getElementById("resultSearch");
    resultSearch.innerHTML = "";
   const inputSearch = document.getElementById("inputSearch");
    inputSearch.value = "";
    inpuntSearch.focus();

});