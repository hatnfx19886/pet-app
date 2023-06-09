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

const breedArr = getFromStorage('breed') || [];
renderBreed(breedArr);

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
