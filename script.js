'use strict';
// Choose element
const form = document.getElementById('add-pet-form');
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
const showBtn = document.getElementById('healthy-btn');

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

// Load data from LocalStorage
let petArr = getFromStorage('pet') || [];
renderTableData(petArr, 'home');

// Click Submit
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = {
    id: idInput.value,
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
    date: new Date().toLocaleDateString('vi-VN'),
  };
  // Check validate
  let validate = true;
  // check id
  if (data.id) {
    const pet = petArr.find((x) => x.id === data.id);
    if (pet) {
      (validate = false), alert('ID must unique!');
    }
  }
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
    petArr.push(data);
    clearInput();
    renderTableData(petArr, 'home');
    saveToStorage('pet', petArr);
  }
});

// Show healthy pet
let healthyCheck = false;
showBtn.addEventListener('click', function () {
  if (!healthyCheck) {
    const healthyArr = petArr.filter(
      (oj) =>
        oj.vaccinated === true && oj.dewormed === true && oj.sterilized === true
    );
    showBtn.textContent = 'Show All Pet';
    healthyCheck = true;
    renderTableData(healthyArr, 'home');
  } else {
    showBtn.textContent = 'Show Healthy Pet';
    healthyCheck = false;
    renderTableData(petArr, 'home');
  }
});

// Delete pet
const deletePet = function (petId) {
  if (confirm('Are you sure ?')) {
    petArr = petArr.filter((x) => x.id !== petId);
    renderTableData(petArr, 'home');
    saveToStorage('pet', petArr);
    showBtn.textContent = 'Show Healthy Pet';
    healthyCheck = false;
  }
};
