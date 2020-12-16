const nrows = 20;
const ncols = 15;
const winCount = 5;
let matrix = [];
let turn;
let gtFive;
let blockTwoSide;
let winLine = [];

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
}

export function setTurn(newTurn) {
  turn = newTurn;
}

export function matrixGame() {
  return matrix;
}

export function play(x, y) {
  if (matrix[x][y] !== null) {
    return false;
  } else {
    matrix[x][y] = turn;
    return checkWin(x, y);
  }
}

const checkWin = (x, y) => {
  if (
    checkVertical(x, y) ||
    checkHorizontal(x, y) ||
    checkTopLeftToBottomRight(x, y) ||
    checkTopRightToBottomLeft(x, y)
  ) {
    return winLine;
  }
  return false;
};

const checkVertical = (x, y) => {
  let count = 1;
  let range = 1;
  let canGoAbove = true;
  let canGoBelow = true;
  let arrayTracking = [{ x: x, y: y }];
  while (true) {
    if (canGoAbove && x - range >= 0) {
      if (matrix[x - range][y] === turn) {
        count++;
        arrayTracking.push({ x: x - range, y: y });
      } else {
        canGoAbove = false;
      }
    } else {
      canGoAbove = false;
    }
    if (canGoBelow && x + range < nrows) {
      if (matrix[x + range][y] === turn) {
        count++;
        arrayTracking.push({ x: x + range, y: y });
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

const checkHorizontal = (x, y) => {
  let count = 1;
  let range = 1;
  let canGoLeft = true;
  let canGoRight = true;
  let checked = 1;
  let arrayTracking = [{ x: x, y: y }];
  while (true) {
    if (canGoLeft && y - range >= 0) {
      if (matrix[x][y - range] === turn) {
        count++;
        checked++;
        arrayTracking.push({ x: x, y: y - range });
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
        arrayTracking.push({ x: x, y: y + range });
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

const checkTopLeftToBottomRight = (x, y) => {
  let count = 1;
  let range = 1;
  let canGoTopLeft = true;
  let canGoBottomRight = true;
  let checked = 1;
  let arrayTracking = [{ x: x, y: y }];
  while (true) {
    if (canGoTopLeft && x - range >= 0 && y - range >= 0) {
      if (matrix[x - range][y - range] === turn) {
        count++;
        checked++;
        arrayTracking.push({ x: x - range, y: y - range });
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
        arrayTracking.push({ x: x + range, y: y + range });
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

const checkTopRightToBottomLeft = (x, y) => {
  let count = 1;
  let range = 1;
  let canGoTopRight = true;
  let canGoBottomLeft = true;
  let checked = 1;
  let arrayTracking = [{ x: x, y: y }];
  while (true) {
    if (canGoTopRight && x - range >= 0 && y + range < ncols) {
      if (matrix[x - range][y + range] === turn) {
        count++;
        checked++;
        arrayTracking.push({ x: x + range, y: y - range });
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
        arrayTracking.push({ x: x + range, y: y - range });
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

// class GameHelper {
//     constructor(gameData, turn, gtFive, blockTwoSide) {
//         this.matrix = new Array(nrows)
//             .fill(0)
//             .map(() => new Array(ncols).fill(null));
//         if (gameData) {
//             for (let i = 0; i < gameData.length; i++) {
//                 let x = gameData[i].x;
//                 let y = gameData[i].y;
//                 let value = gameData[i].value; // 1-2
//                 this.matrix[x][y] = value;
//             }
//         }

//         this.turn = turn;
//         this.gtFive = gtFive;
//         // this.blockTwoSide = blockTwoSide;
//         this.blockTwoSide = false; // default for this deadline
//         this.winLine = [];
//     }

//     setTurn(turn) {
//       console.log(turn);
//         this.turn = turn;
//     }
//     play(x, y) {
//       console.log(`${x}, ${y}`);
//         if (this.matrix[x][y] !== null) {
//             return false;
//         } else {
//             this.matrix[x][y] = this.turn;
//             console.log(this.turn);
//             // if(value === 1){
//             return this.checkWin(x, y);
//             // }
//         }
//     }
//     display() {
//         console.log(this.matrix);
//     }
//     checkWin(x, y) {
//         if (
//             this.checkVertical(x, y) ||
//             this.checkHorizontal(x, y) ||
//             this.checkTopLeftToBottomRight(x, y) ||
//             this.checkTopRightToBottomLeft(x, y)
//         ) {
//             return this.winLine;
//         }
//         return false;
//     }
//     checkVertical(x, y) {
//         let count = 1;
//         let range = 1;
//         let canGoAbove = true;
//         let canGoBelow = true;
//         let checked = 1;
//         let arrayTracking = [{ x: x, y: y }];
//         while (true) {
//             if (canGoAbove && x - range >= 0) {
//                 if (this.matrix[x - range][y] === this.turn) {
//                     count++;
//                     // checked++;
//                     arrayTracking.push({ x: x - range, y: y });
//                 } else {
//                     canGoAbove = false;
//                 }
//             } else {
//                 canGoAbove = false;
//             }
//             if (canGoBelow && x + range < nrows) {
//                 if (this.matrix[x + range][y] === this.turn) {
//                     count++;
//                     // checked++;
//                     arrayTracking.push({ x: x + range, y: y });
//                 } else {
//                     canGoBelow = false;
//                 }
//             } else {
//                 canGoBelow = false;
//             }

//             if (!canGoAbove && !canGoBelow) {
//                 break;
//             }

//             range++;
//         }

//         if (this.gtFive) {
//             if (count >= winCount) {
//                 console.log(this.turn + " win");
//                 this.winLine = arrayTracking;
//                 return true;
//             }
//         } else {
//             if (count == winCount) {
//                 console.log(this.turn + " win");
//                 this.winLine = arrayTracking;
//                 return true;
//             }
//         }

//         console.log(count);
//         return false;
//     }
//     checkHorizontal(x, y) {
//         let count = 1;
//         let range = 1;
//         let canGoLeft = true;
//         let canGoRight = true;
//         let checked = 1;
//         let arrayTracking = [{ x: x, y: y }];
//         while (true) {
//             if (canGoLeft && y - range >= 0) {
//                 if (this.matrix[x][y - range] === this.turn) {
//                     count++;
//                     checked++;
//                     arrayTracking.push({ x: x, y: y - range });
//                     console.log("push left");
//                 } else {
//                     canGoLeft = false;
//                 }
//             } else {
//                 canGoLeft = false;
//             }
//             if (canGoRight && y + range < ncols) {
//                 if (this.matrix[x][y + range] === this.turn) {
//                     count++;
//                     checked++;
//                     arrayTracking.push({ x: x, y: y + range });
//                     console.log("push right");
//                 } else {
//                     canGoRight = false;
//                 }
//             } else {
//                 canGoRight = false;
//             }

//             if (!canGoLeft && !canGoRight) {
//                 break;
//             }

//             range++;
//         }

//         if (this.gtFive) {
//             if (count >= winCount) {
//                 console.log(this.turn + " win");
//                 this.winLine = arrayTracking;
//                 return true;
//             }
//         } else {
//             if (count == winCount) {
//                 console.log(this.turn + " win");
//                 this.winLine = arrayTracking;
//                 console.log(this.winLine);
//                 return true;
//             }
//         }

//         console.log(count);
//         return false;
//     }

//     checkTopLeftToBottomRight(x, y) {
//         let count = 1;
//         let range = 1;
//         let canGoTopLeft = true;
//         let canGoBottomRight = true;
//         let checked = 1;
//         let arrayTracking = [{ x: x, y: y }];
//         while (true) {
//             if (canGoTopLeft && x - range >= 0 && y - range >= 0) {
//                 if (this.matrix[x - range][y - range] === this.turn) {
//                     count++;
//                     checked++;
//                     arrayTracking.push({ x: x - range, y: y - range });
//                     console.log("push left");
//                 } else {
//                     canGoTopLeft = false;
//                 }
//             } else {
//                 canGoTopLeft = false;
//             }

//             if (canGoBottomRight && x + range < nrows && y + range < ncols) {
//                 if (this.matrix[x + range][y + range] === this.turn) {
//                     count++;
//                     checked++;
//                     arrayTracking.push({ x: x + range, y: y + range });
//                     console.log("push right");
//                 } else {
//                     canGoBottomRight = false;
//                 }
//             } else {
//                 canGoBottomRight = false;
//             }

//             if (!canGoTopLeft && !canGoBottomRight) {
//                 break;
//             }

//             range++;
//         }

//         if (this.gtFive) {
//             if (count >= winCount) {
//                 console.log(this.turn + " win");
//                 this.winLine = arrayTracking;
//                 return true;
//             }
//         } else {
//             if (count == winCount) {
//                 console.log(this.turn + " win");
//                 this.winLine = arrayTracking;
//                 console.log(this.winLine);
//                 return true;
//             }
//         }

//         console.log(count);
//         return false;
//     }

//     checkTopRightToBottomLeft(x, y) {
//         let count = 1;
//         let range = 1;
//         let canGoTopRight = true;
//         let canGoBottomLeft = true;
//         let checked = 1;
//         let arrayTracking = [{ x: x, y: y }];
//         while (true) {
//             if (canGoTopRight && x - range >= 0 && y + range < ncols) {
//                 if (this.matrix[x - range][y + range] === this.turn) {
//                     count++;
//                     checked++;
//                     arrayTracking.push({ x: x + range, y: y - range });
//                     console.log("push left");
//                 } else {
//                     canGoTopRight = false;
//                 }
//             } else {
//                 canGoTopRight = false;
//             }

//             if (canGoBottomLeft && x + range < nrows && y - range >= 0) {
//                 if (this.matrix[x + range][y - range] === this.turn) {
//                     count++;
//                     checked++;
//                     arrayTracking.push({ x: x + range, y: y - range });
//                     console.log("push right");
//                 } else {
//                     canGoBottomLeft = false;
//                 }
//             } else {
//                 canGoBottomLeft = false;
//             }

//             if (!canGoTopRight && !canGoBottomLeft) {
//                 break;
//             }

//             range++;
//         }

//         if (this.gtFive) {
//             if (count >= winCount) {
//                 console.log(this.turn + " win");
//                 this.winLine = arrayTracking;
//                 return true;
//             }
//         } else {
//             if (count == winCount) {
//                 console.log(this.turn + " win");
//                 this.winLine = arrayTracking;
//                 console.log(this.winLine);
//                 return true;
//             }
//         }

//         console.log(count);
//         return false;
//     }
// }

// export default GameHelper;

// let data = [
//     { x: 1, y: 1, value: 1 },
//     { x: 2, y: 1, value: 2 },
//     { x: 3, y: 3, value: 1 },
//     { x: 3, y: 4, value: 2 },
// ];
// let game = new GameHelper(data, 1, true, false);
// game.play(19, 0, 1);
// game.play(18, 1, 1);
// game.play(17, 2, 1);
// game.play(16, 3, 1);
// // game.play(15,4,1);
// // game.matrix
