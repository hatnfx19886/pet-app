'use strict';
// Choose element
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const typeInput = document.getElementById('input-type');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const tableBodyEl = document.getElementById('tbody');
const findBtn = document.getElementById('find-btn');

// Show breed list
const renderBreed = function (arr) {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  arr.forEach((breed) => {
    const option = document.createElement('option');
    option.innerHTML = `<option>${breed.breed}</option>`;
    breedInput.appendChild(option);
  });
};
const breedArr = getFromStorage('breed') || [];
renderBreed(breedArr);

// Show pet list
const renderTableData = function (arr) {
  tableBodyEl.innerHTML = '';
  arr.forEach((pet) => {
    const row = document.createElement('tr');
    row.innerHTML = `<th scope="row">${pet.id}</th>
  <td>${pet.name}</td>
  <td>${pet.age}</td>
  <td>${pet.type}</td>
  <td>${pet.petWeight} kg</td>
  <td>${pet.petLength} cm</td>
  <td>${pet.breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
  </td>
  <td><i class="bi ${
    pet.vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
  }"></i></td>
  <td><i class="bi ${
    pet.dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
  }"></i></td>
  <td><i class="bi ${
    pet.sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
  }"></i></td>
  <td>${pet.date}</td>`;
    tableBodyEl.appendChild(row);
  });
};
const petArr = getFromStorage('pet') || [];
renderTableData(petArr);

// Click Find button
findBtn.addEventListener('click', function () {
  const id = idInput.value,
    name = nameInput.value,
    type = typeInput.value,
    breed = breedInput.value,
    vaccinated = vaccinatedInput.checked,
    dewormed = dewormedInput.checked,
    sterilized = sterilizedInput.checked;
  const newPetArr = petArr
    .filter((x) => x.id.includes(id))
    .filter((x) => x.name.includes(name))
    .filter((x) => (type === 'Select Type' ? x : x.type === type))
    .filter((x) => (breed === 'Select Breed' ? x : x.breed === breed))
    .filter((x) => (vaccinated ? x.vaccinated : x))
    .filter((x) => (dewormed ? x.dewormed : x))
    .filter((x) => (sterilized ? x.sterilized : x));
  renderTableData(newPetArr);
});
