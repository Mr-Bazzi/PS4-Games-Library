let storage = 0;
let selectedGames = [];
let totalStorage = 0;

document.getElementById('storage').addEventListener('change', function() {
  storage = parseInt(this.value);
});

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