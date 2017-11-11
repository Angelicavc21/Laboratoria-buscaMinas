window.onload = function () {
  var BOMB = '*',
    BLANK = '',
    SHOW = 'v',
    bombs = 2;

  var colors = { red: 'red', green: 'green', lightGray: '#dddddd', gray: '#c3c3c3', darkGray: 'gray' };
  var texts = { winner: 'Ganaste!!!', loser: 'Perdiste!!!' }

  var matrixOrigin = [[1, 1, 1, BLANK],
    [1, BOMB, 1, BLANK],
    [1, 1, 2, 1],
    [BLANK, BLANK, 1, BOMB]];
  
  var matrixView = [[BLANK, BLANK, BLANK, BLANK],
    [BLANK, BLANK, BLANK, BLANK],
    [BLANK, BLANK, BLANK, BLANK],
    [BLANK, BLANK, BLANK, BLANK]];

  var board = document.querySelector('.board-js'),
    info = document.querySelector('.info-js'),
    btnStart = document.querySelector('.start-js'),
    btnReset = document.querySelector('.reset-js');

  btnStart.addEventListener('click', start);
  btnReset.addEventListener('click', reset);

  function start() {
    reset();
    board.addEventListener('click', displayCell);
    board.addEventListener('mouseover', cellMouseOver);
    board.addEventListener('mouseout', cellMouseOut);
  }

  function cellMouseOver(event) {
    event.target.style.backgroundColor = colors.darkGray;
  }

  function cellMouseOut(event) {
    event.target.style.backgroundColor = colors.gray;
  }

  function reset() {
    info.textContent = BLANK;
    var cells = document.querySelectorAll('td');

    for (var i = 0; i < cells.length; i++) {
      cells[i].textContent = BLANK;
      cells[i].style.backgroundColor = colors.gray;
    }

    for (i = 0; i < matrixView.length; i++) {
      for (var j = 0; j < matrixView.length; j++) {
        matrixView[i][j] = BLANK;
      }
    }
  }

  function displayCell(event) {
    if (event.target.matches('td')) {
      var value = getMatrixValue(event);

      if (value !== SHOW) {
        if (value === '') {
          event.target.style.backgroundColor = colors.lightGray;
        } else {
          event.target.textContent = value;
        }
        setMatrixValue(event);

        // código repetido, crear función
        if (value === BOMB) {
          board.removeEventListener('click', displayCell);
          showBombs(colors.red);
          info.textContent = texts.loser;

          board.removeEventListener('mouseover', cellMouseOver);
          board.removeEventListener('mouseout', cellMouseOut);
        } else if (isWinner()) {
          board.removeEventListener('click', displayCell);
          showBombs(colors.green);
          info.textContent = texts.winner;
        }
      }
    }
  }

  function isWinner() {
    var countVs = 0,
      centinel = false,
      matrixLength = matrixView.length * matrixView.length;

    for (var i = 0; i < matrixView.length && !centinel; i++) {
      for (var j = 0; j < matrixView.length; j++) {
        if (matrixView[i][j] === SHOW)
          countVs++;

        if (countVs === matrixLength - bombs)
          centinel = true;
      }
    }
    return centinel;
  }

  // regresa el valor de la matriz
  function getMatrixValue(event) {
    var row = parseInt(event.target.parentElement.dataset.row);
    var column = parseInt(event.target.dataset.column);

    return matrixOrigin[row - 1][column - 1];
  }

  // asigna el valor de SHOW a la matriz
  function setMatrixValue(event) {
    var row = parseInt(event.target.parentElement.dataset.row);
    var column = parseInt(event.target.dataset.column);

    matrixView[row - 1][column - 1] = SHOW;
  }

  // muestra las bombas
  function showBombs(color) {
    for (var i = 0; i < matrixOrigin.length; i++) {
      for (var j = 0; j < matrixOrigin.length; j++) {
        if (matrixOrigin[i][j] === BOMB) {
          /* cells[i * 4 + j].style.backgroundColor = color; */
          var fila = document.querySelectorAll('tr')[i];
          var cell = fila.querySelectorAll('td')[j];

          cell.style.backgroundColor = color;
        }
      }
    }
  }
};
