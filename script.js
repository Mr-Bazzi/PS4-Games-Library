let storage = 500;
let selectedGames = [];
let totalStorage = 0;

document.getElementById('clear').addEventListener('click', function() {
  selectedGames = [];
  totalStorage = 0;
  document.querySelectorAll('.game button').forEach(function(button) {
    button.textContent = 'Select';
    button.classList.remove('remove');
  });
});

document.getElementById('track').addEventListener('click', function() {
  alert(`You have ${storage - totalStorage} GB of storage left.`);
});

document.getElementById('confirm').addEventListener('click', function() {
  if (totalStorage > storage) {
    document.querySelector('.alert').style.display = 'block';
  } else {
    alert('Games confirmed!');
  }
});

document.querySelectorAll('.game button').forEach(function(button) {
  button.addEventListener('click', function() {
    let game = button.parentNode.parentNode;
    let storageInfo = game.querySelector('.info p:nth-child(2)').textContent;
    let storageValue = parseInt(storageInfo.split(' ')[1]);
    if (button.textContent === 'Select') {
      selectedGames.push(game);
      totalStorage += storageValue;
      button.textContent = 'Remove';
      button.classList.add('remove');
    } else {
      selectedGames.splice(selectedGames.indexOf(game), 1);
      totalStorage -= storageValue;
      button.textContent = 'Select';
      button.classList.remove('remove');
    }
  });
});

// Update selected games list
function updateSelectedGames() {
  const selectedGamesList = document.getElementById('selected-games-list');
  selectedGamesList.innerHTML = '';
  selectedGames.forEach((game) => {
    const li = document.createElement('li');
    li.textContent = `Game ${game.id} (${game.size} MB`;
    selectedGamesList.appendChild(li);
  })
}

function changeStorageTo500gb() {
  storage = 500;
  document.getElementById("500gb").style.backgroundColor = "#c2fbd7";
  document.getElementById("1tb").style.backgroundColor = "white";
}

function changeStorageTo1tb() {
  storage = 1000;
  document.getElementById("500gb").style.backgroundColor = "white";
  document.getElementById("1tb").style.backgroundColor = "#c2fbd7";
}