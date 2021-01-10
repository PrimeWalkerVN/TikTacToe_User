const nrows = 20;
const ncols = 20;
const winCount = 5;
let matrix = [];
let turn;
let gtFive;
let blockTwoSide;
let winLine = [];

//x row y column
export function newGame(gameData, startTurn, gtFiveConfig, blockTwoSideConfig) {
  matrix = new Array(nrows).fill(0).map(() => new Array(ncols).fill(null));
  if (gameData) {
    for (let i = 0; i < gameData.length; i++) {
      let x = gameData[i].x;
      let y = gameData[i].y;
      let value = gameData[i].value; // 1-2
      matrix[x][y] = value;
    }
  }

  turn = startTurn;
  gtFive = gtFiveConfig;
  blockTwoSide = blockTwoSideConfig;

  return matrix;
}

export function setTurn(newTurn) {
  turn = newTurn;
}

export function matrixGame() {
  return matrix;
}

export function play(value, x, y) {
  if (matrix[x][y] !== null) {
    return false;
  } else {
    matrix[x][y] = turn;
    return checkWin(value, x, y);
  }
}

const checkWin = (value, x, y) => {
  if (
    checkVertical(value, x, y) ||
    checkHorizontal(value, x, y) ||
    checkTopLeftToBottomRight(value, x, y) ||
    checkTopRightToBottomLeft(value, x, y)
  ) {
    return winLine;
  }else{
    if(isDraw()){
      return {isDraw: true};
    }
  }
  return false;
};

const checkVertical = (value, x, y) => {
  let count = 1;
  let range = 1;
  let canGoAbove = true;
  let canGoBelow = true;
  let arrayTracking = [{ value, x: x, y: y }];
  while (true) {
    if (canGoAbove && x - range >= 0) {
      if (matrix[x - range][y] === turn) {
        count++;
        arrayTracking.push({ value, x: x - range, y: y });
      } else {
        canGoAbove = false;
      }
    } else {
      canGoAbove = false;
    }
    if (canGoBelow && x + range < nrows) {
      if (matrix[x + range][y] === turn) {
        count++;
        arrayTracking.push({ value, x: x + range, y: y });
      } else {
        canGoBelow = false;
      }
    } else {
      canGoBelow = false;
    }

    if (!canGoAbove && !canGoBelow) {
      break;
    }

    range++;
  }

  if (gtFive) {
    if (count >= winCount) {
      console.log(turn + " win");
      winLine = arrayTracking;
      return true;
    }
  } else {
    if (count == winCount) {
      console.log(turn + " win");
      winLine = arrayTracking;
      return true;
    }
  }

  return false;
};

const checkHorizontal = (value, x, y) => {
  let count = 1;
  let range = 1;
  let canGoLeft = true;
  let canGoRight = true;
  let checked = 1;
  let arrayTracking = [{ value, x: x, y: y }];
  while (true) {
    if (canGoLeft && y - range >= 0) {
      if (matrix[x][y - range] === turn) {
        count++;
        checked++;
        arrayTracking.push({ value, x: x, y: y - range });
      } else {
        canGoLeft = false;
      }
    } else {
      canGoLeft = false;
    }
    if (canGoRight && y + range < ncols) {
      if (matrix[x][y + range] === turn) {
        count++;
        checked++;
        arrayTracking.push({ value, x: x, y: y + range });
      } else {
        canGoRight = false;
      }
    } else {
      canGoRight = false;
    }

    if (!canGoLeft && !canGoRight) {
      break;
    }

    range++;
  }

  if (gtFive) {
    if (count >= winCount) {
      console.log(turn + " win");
      winLine = arrayTracking;
      return true;
    }
  } else {
    if (count == winCount) {
      console.log(turn + " win");
      winLine = arrayTracking;
      console.log(winLine);
      return true;
    }
  }

  return false;
};

const checkTopLeftToBottomRight = (value, x, y) => {
  let count = 1;
  let range = 1;
  let canGoTopLeft = true;
  let canGoBottomRight = true;
  let checked = 1;
  let arrayTracking = [{ value, x: x, y: y }];
  while (true) {
    if (canGoTopLeft && x - range >= 0 && y - range >= 0) {
      if (matrix[x - range][y - range] === turn) {
        count++;
        checked++;
        arrayTracking.push({ value, x: x - range, y: y - range });
      } else {
        canGoTopLeft = false;
      }
    } else {
      canGoTopLeft = false;
    }

    if (canGoBottomRight && x + range < nrows && y + range < ncols) {
      if (matrix[x + range][y + range] === turn) {
        count++;
        checked++;
        arrayTracking.push({ value, x: x + range, y: y + range });
      } else {
        canGoBottomRight = false;
      }
    } else {
      canGoBottomRight = false;
    }

    if (!canGoTopLeft && !canGoBottomRight) {
      break;
    }

    range++;
  }

  if (gtFive) {
    if (count >= winCount) {
      console.log(turn + " win");
      winLine = arrayTracking;
      return true;
    }
  } else {
    if (count == winCount) {
      console.log(turn + " win");
      winLine = arrayTracking;
      return true;
    }
  }

  return false;
};

const checkTopRightToBottomLeft = (value, x, y) => {
  let count = 1;
  let range = 1;
  let canGoTopRight = true;
  let canGoBottomLeft = true;
  let checked = 1;
  let arrayTracking = [{ value, x: x, y: y }];
  while (true) {
    if (canGoTopRight && x - range >= 0 && y + range < ncols) {
      if (matrix[x - range][y + range] === turn) {
        count++;
        checked++;
        arrayTracking.push({ value, x: x - range, y: y + range });
      } else {
        canGoTopRight = false;
      }
    } else {
      canGoTopRight = false;
    }

    if (canGoBottomLeft && x + range < nrows && y - range >= 0) {
      if (matrix[x + range][y - range] === turn) {
        count++;
        checked++;
        arrayTracking.push({ value, x: x + range, y: y - range });
      } else {
        canGoBottomLeft = false;
      }
    } else {
      canGoBottomLeft = false;
    }

    if (!canGoTopRight && !canGoBottomLeft) {
      break;
    }

    range++;
  }

  if (gtFive) {
    if (count >= winCount) {
      console.log(turn + " win");
      winLine = arrayTracking;
      return true;
    }
  } else {
    if (count == winCount) {
      console.log(turn + " win");
      winLine = arrayTracking;
      console.log(winLine);
      return true;
    }
  }

  return false;
};

const isDraw = () => {
  for (let i = 0; i < nrows; i++) {
    for (let j = 0; j < ncols; j++) {
      if (matrix[i][j] != null) {
        return false;
      }
    }
  }
  return true;
};
