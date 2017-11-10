window.onload = function () {
  var BOMB = '*',
    BLANK = '',
    SHOW = 'v',
    bombs = 2,
    gameOver = false;

  var matrixOrigin = [[1, 1, 1, BLANK],
  [1, BOMB, 1, BLANK],
  [1, 1, 2, 1],
  [BLANK, BLANK, 1, BOMB]];

  var cells = document.querySelectorAll('td'),
    board = document.querySelector('.board-js'),
    info = document.querySelector('.info-js');

  board.addEventListener('click', displayCell);

  function displayCell(event) {
    if (event.target.matches('td')) {
      var value = getMatrixValue(event);

      if (value !== SHOW) {
        if (value === '') {
          event.target.style.backgroundColor = '#dddddd';
        } else {
          event.target.textContent = value;
        }
        setMatrixValue(event);

        if (value === '*') {
          board.removeEventListener('click', displayCell);
          gameOver = true;
          showBombs(matrixOrigin, BOMB, cells, 'red');
          info.textContent = 'Perdiste!!!';          
        } else {
          if (isWinner()) {
            board.removeEventListener('click', displayCell);
            info.textContent = 'Ganaste!!!';
            showBombs(matrixOrigin, BOMB, cells, 'green');         
          }
        }
      }
    }
  };

  function isWinner() {
    var countVs = 0,
      centinel = false;

    for (var i = 0; i < matrixOrigin.length && !centinel; i++) {
      for (var j = 0; j < matrixOrigin.length; j++) {
        if (matrixOrigin[i][j] === SHOW)
          countVs++;

        if (countVs === 14)
          centinel = true;
      }
    }
    return centinel;
  }

  //regresa el valor de la matriz
  function getMatrixValue(event) {
    var row = parseInt(event.target.parentElement.dataset.row);
    var column = parseInt(event.target.dataset.column);

    return matrixOrigin[row - 1][column - 1];
  }

  //asigna el valor de SHOW a la matriz
  function setMatrixValue(event) {
    var row = parseInt(event.target.parentElement.dataset.row);
    var column = parseInt(event.target.dataset.column);

    matrixOrigin[row - 1][column - 1] = SHOW;
  }

  //muestra las bombas -test-
  function showBombs(matrixOrigin, BOMB, cells, color) {
    for (var i = 0; i < matrixOrigin.length; i++) {
      for (var j = 0; j < matrixOrigin.length; j++) {
        if (matrixOrigin[i][j] === BOMB)
          cells[i * 4 + j].style.backgroundColor = color;
      }
    }
  };

};

