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
    <button type="button" class="btn btn-${
      type === 'edit' ? 'warning' : 'danger'
    }" onclick="${type === 'edit' ? 'editPet' : 'deletePet'}('${pet.id}')">${
      type === 'edit' ? 'Edit' : 'Delete'
    }</button>
  </td>`;
    tableBodyEl.appendChild(row);
  });
};
