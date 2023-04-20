'use strict';
// Choose element
const submitBtn = document.getElementById('submit-btn');
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

// Show breed list
const renderBreed = function (arr) {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  arr.forEach((breed) => {
    const option = document.createElement('option');
    option.innerHTML = `${breed.breed}`;
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

// Function show pet list
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
  <td>${pet.date}</td>
<td>
    <button type="button" class="btn btn-danger" onclick="deletePet('${
      pet.id
    }')">Delete</button>
  </td>`;
    tableBodyEl.appendChild(row);
  });
};
// Load data from LocalStorage
const petArr = getFromStorage('pet') || [];
renderTableData(petArr);

// Click Submit
let now = new Date();
submitBtn.addEventListener('click', function () {
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
    date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
  };
  // Check validate
  let validate = true;
  // check id
  if (!data.id) {
    validate = false;
    alert('Please input for Pet ID');
  } else {
    const pet = petArr.find((x) => x.id === data.id);
    if (pet) {
      (validate = false), alert('ID must unique!');
    }
  }
  // Check name
  if (!data.name) {
    validate = false;
    alert('Plear input for Pet Name ');
  }
  // Check age
  if (!data.age) {
    validate = false;
    alert('Please input for Age');
  } else if (data.age < 1 || data.age > 15) {
    validate = false;
    alert('Age must be between 1 and 15!');
  }
  // Check type
  if (data.type === 'Select Type') {
    validate = false;
    alert('Please select Type!');
  }
  // Check weigth
  if (!data.petWeight) {
    validate = false;
    alert('Please input for Weight');
  } else if (data.petWeight < 1 || data.petWeight > 15) {
    validate = false;
    alert('Weight must be between 1 and 15!');
  }
  // Check length
  if (!data.petLength) {
    validate = false;
    alert('Please input for Length');
  } else if (data.petLength < 1 || data.petLength > 100) {
    validate = false;
    alert('Length must be between 1 and 100!');
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
    renderTableData(petArr);
    saveToStorage('pet', petArr);
  }
});

// Delete pet
const deletePet = function (petId) {
  if (confirm('Are you sure ?')) {
    const index = petArr.findIndex((x) => x.id === petId);
    petArr.splice(index, 1);
    renderTableData(petArr);
    saveToStorage('pet', petArr);
  }
};

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
    renderTableData(healthyArr);
  } else {
    showBtn.textContent = 'Show Healthy Pet';
    healthyCheck = false;
    renderTableData(petArr);
  }
});
