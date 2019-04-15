const canvasWidth = 800,
      canvasHeight = 400,
      timeout = 500,
      ctx = document.getElementById('canvas').getContext('2d'),
      $startBtn = document.getElementById('start');

let counter = 0,
    arrayStates = [];

export const current_array_state = array => {
  ++counter
  arrayStates.push(JSON.parse(JSON.stringify(array))); // push copy by value
}

export const update_canvas_with_new_state = () => {
  for (let i = 1, arrayStatesLength = arrayStates.length; i < arrayStatesLength; i++) {
    (index => {
     setTimeout(() => {
       ctx.clearRect(0, 0, canvasWidth, canvasHeight);
       ctx.fillStyle = '#000';
       ctx.fillRect(0, 0, canvasWidth, canvasHeight);
       drawState(arrayStates[i]);
       if (i === arrayStatesLength - 1) $startBtn.disabled = false;
    }, i * timeout);
    })(i);
  }
}

const drawState = currentState => {
    const currentStateLength = currentState.length,
          lineWidth = Math.floor((canvasWidth / 2) / currentStateLength);

    for (let i = 0; i < currentStateLength; i++) {
      const xPosition = canvasWidth - (lineWidth * 2 * (i + 1));

      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(xPosition, canvasHeight);
      ctx.lineTo(xPosition, currentState[i] * canvasHeight / currentStateLength);
      ctx.strokeStyle = "#FFF"
      ctx.stroke();
    }
}
