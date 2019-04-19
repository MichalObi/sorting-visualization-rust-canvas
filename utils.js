const ctx = document.getElementById('canvas').getContext('2d'),
      $startBtn = document.getElementById('start'),
      canvasWidth = 800,
      canvasHeight = 400,
      bcgColor = '#000',
      itemColor = '#FFF',
      finalItemColor = '#FF0000';

let counter = 0,
    arrayStates = [];

export const current_array_state = array => {
  ++counter
  arrayStates.push(JSON.parse(JSON.stringify(array))); // push copy by value
}

export const update_canvas_with_new_state = speed => {
  for (let i = 0, arrayStatesLength = arrayStates.length; i < arrayStatesLength; i++) {
    (index => {
     setTimeout(() => {
       const finalIteration = i === arrayStatesLength - 1;

       ctx.clearRect(0, 0, canvasWidth, canvasHeight);
       ctx.fillStyle = bcgColor;
       ctx.fillRect(0, 0, canvasWidth, canvasHeight);
       drawState(arrayStates[i], finalIteration);

       if (finalIteration) $startBtn.disabled = false;

      }, i * speed);
    })(i);
  }
}

const drawFinishBlink = (x, y) => {
  const grd = ctx.createRadialGradient(x, 0, 0, x, y, canvasWidth);

  grd.addColorStop(0, itemColor);
  grd.addColorStop(1, finalItemColor);

  ctx.strokeStyle = grd;
  ctx.stroke();
}

const drawState = (currentState, isFinal) => {
    const currentStateLength = currentState.length,
          lineWidth = Math.floor((canvasWidth / 2) / currentStateLength);

  for (let i = 0; i < currentStateLength; i++) {
    const xPosition = canvasWidth - (lineWidth * 2 * (i + 1)),
          yPosition = currentState[i] * canvasHeight / currentStateLength;

    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(xPosition, canvasHeight);
    ctx.lineTo(xPosition, yPosition);

    if (isFinal) {
      drawFinishBlink(xPosition, yPosition);
    } else {
      ctx.strokeStyle = itemColor;
      ctx.stroke();
    }
  }
}
