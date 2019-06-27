let w = 30;

let boxes = [];
let stack = [];
let crt, colC, rowC;
let speed;

function setup() {
  createCanvas(900, 900);
  noStroke();

  speed = createSlider(1,51,5,5);
  speed.input(changeFrameRate);
  frameRate(speed.value());

  colC = width / w;
  rowC = height / w;


  for (let j = 0; j < height; j += w) {
    for (let i = 0; i < width; i += w) {
      let b = new Box(i, j, w);
      boxes.push(b);
    }
  }
  crt = random(boxes);
  crt.use();
}

function draw() {
  background(51);
  drawBoxes();

  crt.current();

  let cont = false;
  let ni;
  let index = boxes.indexOf(crt);
  // index = x * colC + y;
  let y = parseInt(index / colC);
  let x = index % colC;

  if (doesHaveNonVisitedNeig(crt)) {
    do {
      let dire = rollDirection();

      if (
        (dire === 0 && y === 0) ||
        (dire === 1 && x === (colC - 1)) ||
        (dire === 2 && y === (colC - 1)) ||
        (dire === 3 && x === 0)
      ) {
        if (!doesHaveNonVisitedNeig(crt)) {
          break;
        }
        cont = true;
        continue;
      }
      switch (dire % 4) {
        case 0:
          ni = index - colC;
          break;
        case 1:
          ni = index + 1;
          break;
        case 2:
          ni = index + colC;
          break;
        case 3:
          ni = index - 1;
          break;
        default:
          console.log("default switch");
          break;
      }
      if (boxes[ni].isUsed()) {
        cont = true;
      } else {
        cont = false;
        stack.push(crt);
        crt.breakWall(dire);
        crt = boxes[ni];
        crt.breakWall((dire + 2) % 4);
        crt.use();
      }
    } while (cont);
  } else {
    crt = stack.pop();
  }

  if (stack.length == 0) {
    drawBoxes();
    noLoop();
  }
}

function rollDirection() {
  return floor(random(4));
}

function doesHaveNonVisitedNeig(box) {
  let index = boxes.indexOf(box);
  let y = floor(index / colC);
  let x = index % colC;
  if (y === 0 && x === 0) {
    return !boxes[index + 1].isUsed() ||
      !boxes[index + colC].isUsed();
  } else if (x === (colC - 1) && y === (colC - 1)) {
    return !boxes[index - colC].isUsed() ||
      !boxes[index - 1].isUsed();
  } else if (x === 0 && y === (colC - 1)) {
    return !boxes[index - colC].isUsed() ||
      !boxes[index + 1].isUsed();
  } else if (x === (colC - 1) && y === 0) {
    return !boxes[index + colC].isUsed() ||
      !boxes[index - 1].isUsed();
  } else if (y === 0) {
    return !boxes[index + 1].isUsed() ||
      !boxes[index + colC].isUsed() ||
      !boxes[index - 1].isUsed();
  } else if (x === (colC - 1)) {
    return !boxes[index - colC].isUsed() ||
      !boxes[index + colC].isUsed() ||
      !boxes[index - 1].isUsed();
  } else if (y === (colC - 1)) {
    return !boxes[index - colC].isUsed() ||
      !boxes[index + 1].isUsed() ||
      !boxes[index - 1].isUsed();
  } else if (x === 0) {
    return !boxes[index - colC].isUsed() ||
      !boxes[index + 1].isUsed() ||
      !boxes[index + colC].isUsed();
  } else {
    return !boxes[index - colC].isUsed() ||
      !boxes[index + 1].isUsed() ||
      !boxes[index + colC].isUsed() ||
      !boxes[index - 1].isUsed();
  }
}

function drawBoxes() {
  boxes.forEach(box => {
    box.show();
  });
}

function changeFrameRate(){
  frameRate(speed.value());
}