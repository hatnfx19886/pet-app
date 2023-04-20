'use strict';
const currentPet = getFromStorage('pet') || [];

// Export File
const savePetArr = function () {
  const pet = JSON.stringify(currentPet);
  const blob = new Blob([pet], {
    type: 'text/plain;charset=utf-8',
  });
  saveAs(blob, 'pet.JSON');
};
document.getElementById('export-btn').addEventListener('click', savePetArr);

// Import File
let data;
const fileUpLoad = document.getElementById('input-file');
const reader = new FileReader();
fileUpLoad.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file.type === 'application/json') {
    reader.readAsText(file);
    reader.addEventListener('load', (event) => {
      data = event.target.result;
    });
  }
});

document.getElementById('import-btn').addEventListener('click', function () {
  if (!data) {
    alert('Please choose a JSON file');
  } else {
    const upLoadPet = JSON.parse(data);
    currentPet.forEach((pet) => {
      !upLoadPet.some((x) => x.id === pet.id) && upLoadPet.push(pet);
    });
    fileUpLoad.value = '';
    saveToStorage('pet', upLoadPet);
  }
});
