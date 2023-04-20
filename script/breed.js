'use strict';
// Choose Element
const breedInput = document.getElementById('input-breed');
const typeInput = document.getElementById('input-type');
const submidBtn = document.getElementById('submit-btn');
const tableBodyEl = document.getElementById('tbody');

// Function Clear input
const clearInput = function () {
  breedInput.value = '';
  typeInput.value = 'Select Type';
};

// Function Show Breed list
const renderBreedTable = function (arr) {
  tableBodyEl.innerHTML = '';
  arr.forEach((breed, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${index + 1}</td>
    <td>${breed.breed}</td>
    <td>${breed.type}</td>
    <td>
    <button type="button" class="btn btn-danger" onclick="deleteBreed(${index})">Delete</button>
  </td>`;
    tableBodyEl.appendChild(row);
  });
};

const breedArr = getFromStorage('breed') || [];
renderBreedTable(breedArr);

// Click Submit
submidBtn.addEventListener('click', function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  // Check data
  let validate = true;
  if (!data.breed) {
    validate = false;
    alert('Please input for Breed');
  }
  if (data.type === 'Select Type') {
    validate = false;
    alert('Please select Type!');
  }
  if (validate) {
    breedArr.push(data);
    clearInput();
    renderBreedTable(breedArr);
    saveToStorage('breed', breedArr);
  }
});
// Delete Breed
const deleteBreed = function (i) {
  if (confirm('are you sure?')) {
    breedArr.splice(i, 1);
    renderBreedTable(breedArr);
    saveToStorage('breed', breedArr);
  }
};
