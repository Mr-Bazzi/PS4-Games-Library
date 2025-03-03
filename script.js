let storage = 350.00;
let selectedGames = [];
let totalStorage = 0.00;

document.getElementById('spaceLeft').innerHTML = (storage - totalStorage).toFixed(2);

document.getElementById('clear').addEventListener('click', function() {
  selectedGames = [];
  totalStorage = 0;
  document.querySelectorAll('.game button').forEach(function(button) {
    button.textContent = 'Select';
    button.classList.remove('remove');
  });
  document.getElementById('spaceLeft').innerHTML = (storage - totalStorage).toFixed(2);
  updateSelectedGames();
});

document.getElementById('track').addEventListener('click', function() {
  alert(`You have ${storage - totalStorage} GB of storage left.`);
});

// document.getElementById('confirm').addEventListener('click', function() {
//   if (totalStorage > storage) {
//     document.querySelector('.alert').style.display = 'block';
//   } else {
//     alert('Games confirmed!');
//   }
// });

document.querySelectorAll('.game button').forEach(function(button) {
  button.addEventListener('click', function() {
    let game = button.parentNode.parentNode;
    let storageInfo = game.querySelector('.info p:nth-child(2)').textContent;
    let storageValue = parseFloat(storageInfo.split(' ')[1]);
    
    if (button.textContent === 'Select') {
        // Check if there's enough storage left
        if (totalStorage + storageValue > storage) {
            alert("Not enough storage to add this game!");
        } else {
            selectedGames.push(game);
            totalStorage += storageValue;
            button.textContent = 'Remove';
            button.classList.add('remove');
        }
    } else {
        selectedGames.splice(selectedGames.indexOf(game), 1);
        totalStorage -= storageValue;
        button.textContent = 'Select';
        button.classList.remove('remove');
    }
    document.getElementById('spaceLeft').innerHTML = (storage - totalStorage).toFixed(2);
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
  storage = 350.00;
  document.getElementById("500gb").style.backgroundColor = "#c2fbd7";
  document.getElementById("1tb").style.backgroundColor = "white";
  document.getElementById('spaceLeft').innerHTML = (storage - totalStorage).toFixed(2);
}

function changeStorageTo1tb() {
  storage = 820.00;
  document.getElementById("500gb").style.backgroundColor = "white";
  document.getElementById("1tb").style.backgroundColor = "#c2fbd7";
  document.getElementById('spaceLeft').innerHTML = (storage - totalStorage).toFixed(2);
}


// WhatsApp button (start)
document.getElementById('sendWhatsApp').addEventListener('click', function() {
  if (selectedGames.length === 0) {
      alert("Please select at least one game to share.");
      return;
  }

  let message = "Selected Games for PS4:\n";
  selectedGames.forEach((game, index) => {
      let gameName = game.querySelector('.info p:nth-child(1)').textContent;
      let gameSize = game.querySelector('.info p:nth-child(2)').textContent;
      message += `${index + 1}. ${gameName} (${gameSize})\n`;
  });

  message += `\nTotal Storage Used: ${totalStorage.toFixed(2)} GB\n`;
  message += `Space Left: ${(storage - totalStorage).toFixed(2)} GB`;

  // Use the specific WhatsApp number
  let phoneNumber = "+96178998562";
  let whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, '_blank');
});

// WhatsApp button (end)

// (start) A Function to make the pictures clickable //

function selectGame(element) {
  // If the element is the image container, find the corresponding button
  let button;
  if (element.tagName === 'DIV') {
    button = element.parentNode.querySelector('.select');
  } else {
    button = element;
  }

  let game = button.parentNode.parentNode;
  let storageInfo = game.querySelector('.info p:nth-child(2)').textContent;
  let storageValue = parseFloat(storageInfo.split(' ')[1]);

  if (button.textContent === 'Select') {
    // Check if there's enough storage left
    if (totalStorage + storageValue > storage) {
      alert("Not enough storage to add this game!");
    } else {
      selectedGames.push(game);
      totalStorage += storageValue;
      button.textContent = 'Remove';
      button.classList.add('remove');
    }
  } else {
    selectedGames.splice(selectedGames.indexOf(game), 1);
    totalStorage -= storageValue;
    button.textContent = 'Select';
    button.classList.remove('remove');
  }
  document.getElementById('spaceLeft').innerHTML = (storage - totalStorage).toFixed(2);
}

// (end) A function to make the pictures clickable //