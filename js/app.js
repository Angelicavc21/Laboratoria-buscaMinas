window.onload = function () {
  var board = document.querySelector('.board-js'),
    info = document.querySelector('.info-js'),
    btnStart = document.querySelector('.start-js'),
    btnReset = document.querySelector('.reset-js');

  btnStart.addEventListener('click', start);
  btnReset.addEventListener('click', reset);

  function start() {
    board.BOMB = '*',
    board.BLANK = '',
    board.SHOW = 'v',
    board.bombs = 2;

    board.colors = { red: 'red', green: 'green', lightGray: '#dddddd', gray: '#c3c3c3', darkGray: 'gray' };
    board.texts = { winner: 'Ganaste!!!', loser: 'Perdiste!!!' };

    board.matrixOrigin = [[1, 1, 1, board.BLANK],
      [1, board.BOMB, 1, board.BLANK],
      [1, 1, 2, 1],
      [board.BLANK, board.BLANK, 1, board.BOMB]];

    board.matrixView = [[board.BLANK, board.BLANK, board.BLANK, board.BLANK],
      [board.BLANK, board.BLANK, board.BLANK, board.BLANK],
      [board.BLANK, board.BLANK, board.BLANK, board.BLANK],
      [board.BLANK, board.BLANK, board.BLANK, board.BLANK]];

    reset();
    board.addEventListener('click', displayCell);
    board.addEventListener('mouseover', cellMouseOver);
    board.addEventListener('mouseout', cellMouseOut);
  }

  function cellMouseOver(event) {
    if (event.target.matches('td')) {
      var row = parseInt(event.target.parentElement.dataset.row);
      var column = parseInt(event.target.dataset.column);

      if (board.matrixView[row - 1][column - 1] === '')
        event.target.style.backgroundColor = board.colors.darkGray;
    }
  }

  function cellMouseOut(event) {
    if (event.target.matches('td')) {
      var row = parseInt(event.target.parentElement.dataset.row);
      var column = parseInt(event.target.dataset.column);

      if (board.matrixView[row - 1][column - 1] === '')
        event.target.style.backgroundColor = board.colors.gray;    
    }
  }

  function reset() {
    info.textContent = board.BLANK;
    var cells = document.querySelectorAll('td');

    for (var i = 0; i < cells.length; i++) {
      cells[i].textContent = board.BLANK;
      cells[i].style.backgroundColor = board.colors.gray;
    }

    for (i = 0; i < board.matrixView.length; i++) {
      for (var j = 0; j < board.matrixView.length; j++) {
        board.matrixView[i][j] = board.BLANK;
      }
    }
  }

  function displayCell(event) {
    if (event.target.matches('td')) {
      var value = getMatrixValue(event);

      if (value !== board.SHOW) {
        if (value === '') {
          event.target.style.backgroundColor = board.colors.lightGray;
        } else {
          event.target.textContent = value;
        }
        setMatrixValue(event);

        // código repetido, crear función
        if (value === board.BOMB) {
          board.removeEventListener('click', displayCell);
          showBombs(board.colors.red);
          info.textContent = board.texts.loser;

          board.removeEventListener('mouseover', cellMouseOver);
          board.removeEventListener('mouseout', cellMouseOut);
        } else if (isWinner()) {
          board.removeEventListener('click', displayCell);
          showBombs(board.colors.green);
          info.textContent = board.texts.winner;
        }
      }
    }
  }

  function isWinner() {
    var countVs = 0,
      centinel = false,
      matrixLength = board.matrixView.length * board.matrixView.length;

    for (var i = 0; i < board.matrixView.length && !centinel; i++) {
      for (var j = 0; j < board.matrixView.length; j++) {
        if (board.matrixView[i][j] === board.SHOW)
          countVs++;

        if (countVs === matrixLength - board.bombs)
          centinel = true;
      }
    }
    return centinel;
  }

  // regresa el valor de la matriz
  function getMatrixValue(event) {
    var row = parseInt(event.target.parentElement.dataset.row);
    var column = parseInt(event.target.dataset.column);

    return board.matrixOrigin[row - 1][column - 1];
  }

  // asigna el valor de SHOW a la matriz
  function setMatrixValue(event) {
    var row = parseInt(event.target.parentElement.dataset.row);
    var column = parseInt(event.target.dataset.column);

    board.matrixView[row - 1][column - 1] = board.SHOW;
  }

  // muestra las bombas
  function showBombs(color) {
    for (var i = 0; i < board.matrixOrigin.length; i++) {
      for (var j = 0; j < board.matrixOrigin.length; j++) {
        if (board.matrixOrigin[i][j] === board.BOMB) {
          /* cells[i * 4 + j].style.backgroundColor = color; */
          var fila = document.querySelectorAll('tr')[i];
          var cell = fila.querySelectorAll('td')[j];

          cell.style.backgroundColor = color;
        }
      }
    }
  }
};
