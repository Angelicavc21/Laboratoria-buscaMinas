window.onload = function () {
  var BOMB = '*',
    BLANK = '',
    size = 4;
  var matrixOrigin = [[1, 1, 1, BLANK],
  [1, BOMB, 1, BLANK],
  [1, 1, 1, 1],
  [BLANK, BLANK, 1, BOMB]];
  var cells = document.querySelectorAll('td'),
      board = document.querySelector('.board-js');
  board.addEventListener('click', displayCell);
  
  /* newFunction(matrixOrigin, BOMB, cells); */
};

function displayCell(event) {
  if (event.target.matches('td')) {
    event.target.style.backgroundColor = 'red';
  }
};

function newFunction(matrixOrigin, BOMB, cells) {
  for (var i = 0; i < matrixOrigin.length; i++) {
    for (var j = 0; j < matrixOrigin.length; j++) {
      if (matrixOrigin[i][j] === BOMB) {
        cells[i * 4 + j].style.backgroundColor = 'red';
      }
    }
  }
};

