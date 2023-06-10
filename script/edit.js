'use strict';
// Choose element
const form = document.getElementById('pet-edit-form');
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const tableBodyEl = document.getElementById('tbody');
const editForm = document.getElementById('container-form');
// Function clear form
const clearInput = function () {
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  typeInput.value = 'Select Type';
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = '#000000';
  breedInput.innerHTML = `<option>Select Breed</option>`;
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};
const petArr = getFromStorage('pet') || [];

renderTableData(petArr, 'edit');

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
const dogArr = breedArr.filter((oj) => oj.type === 'Dog');
const catArr = breedArr.filter((oj) => oj.type === 'Cat');
typeInput.addEventListener('change', function () {
  if (typeInput.value === 'Dog') {
    renderBreed(dogArr);
  } else if (typeInput.value === 'Cat') {
    renderBreed(catArr);
  } else if (typeInput.value === 'Select Type') {
    breedInput.innerHTML = `<option>Select Breed</option>`;
  }
});

// Function edit pet
let id;
const editPet = function (petid) {
  id = petid;
  editForm.classList.remove('hide');
  const pet = petArr.find((x) => x.id === petid);
  idInput.value = petid;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.petWeight;
  lengthInput.value = pet.petLength;
  colorInput.value = pet.color;
  pet.type === 'Dog' ? renderBreed(dogArr) : renderBreed(catArr);
  breedInput.value = pet.breed;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
};

// Click Submit
let now = new Date();
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = {
    id,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    petWeight: weightInput.value,
    petLength: lengthInput.value,
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
  };
  // Check validate
  let validate = true;
  // Check type
  if (data.type === 'Select Type') {
    validate = false;
    alert('Please select Type!');
  }
  // Check breed
  if (data.breed === 'Select Breed') {
    validate = false;
    alert('Please select Breed!');
  }
  // Add pet in the array
  if (validate) {
    const index = petArr.findIndex((x) => x.id === data.id);
    petArr[index] = data;
    editForm.classList.add('hide');
    clearInput();
    renderTableData(petArr, 'edit');
    saveToStorage('pet', petArr);
  }
});
