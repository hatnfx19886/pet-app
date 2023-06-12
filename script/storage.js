'use strict';
// Add Animation for Sidebar
const navbarEl = document.getElementById('sidebar');
navbarEl.addEventListener('click', function () {
  navbarEl.classList.toggle('active');
});

// Local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Function show pet list
const renderTableData = function (arr, type) {
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
    ${
      type === 'home'
        ? `<button type="button" class="btn btn-danger" onclick="deletePet('${pet.id}')">Delete 
    </button>`
        : ''
    }
    ${
      type === 'edit'
        ? `<button type="button" class="btn btn-warning" onclick="editPet('${pet.id}')">Edit 
    </button>`
        : ''
    }
  </td>`;
    tableBodyEl.appendChild(row);
  });
};

// Show breed list
const renderBreed = function (arr) {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  arr.forEach((breed) => {
    const option = document.createElement('option');
    option.innerHTML = `<option>${breed.breed}</option>`;
    breedInput.appendChild(option);
  });
};
