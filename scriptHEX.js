  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getRandomOptions(mainColor) {
    const options = [mainColor, getRandomColor(), getRandomColor()];
    return options;
  }

  function setupOptions(mainColor) {
    const optionsContainer = document.getElementById('options');
    const options = getRandomOptions(mainColor);

    options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.className = 'option';
      optionElement.style.backgroundColor = option;
      optionElement.onclick = () => selectOption(option, mainColor);
      optionsContainer.appendChild(optionElement);
    });
  }

  function selectOption(selectedColor, mainColor) {
    checkGuess(selectedColor, mainColor);
  }

  function checkGuess(selectedColor, mainColor) {
    const inputColor = selectedColor.toUpperCase();

    if (inputColor === mainColor) {
      showMessage('Congratulations! You guessed it!', 'green');
    } else {
      showMessage('Incorrect. Try again.', 'red');
    }
  }

  function showMessage(message, color) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = color;

    if (color === 'green') {
      colorBox.style.border = '2px solid #4CAF50';
    } else {
      colorBox.style.border = '2px solid #FF6347';
    }

    targetColor = getRandomColor();
    colorBox.style.backgroundColor = targetColor;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    setupOptions(targetColor);

    const colorCodeElement = document.getElementById('colorCode');
    colorCodeElement.textContent = targetColor.toUpperCase();
  }

  let targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;
  document.getElementById('colorCode').textContent = targetColor.toUpperCase();
  setupOptions(targetColor);