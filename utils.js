let counter = 0,
    arrayStates = [];

const ctx = document.getElementById('canvas').getContext('2d');

export const current_array_state = array => {
  ++counter
  arrayStates.push(JSON.parse(JSON.stringify(array))); // push copy by value
}

export const update_canvas_with_new_state = () => {
  for (let i = 0, arrayStatesLength = arrayStates.length; i < arrayStatesLength; i++) {
    (index => {
     setTimeout(() => {
       ctx.clearRect(0, 0, 800, 400);
       ctx.fillStyle = '#000';
       ctx.fillRect(0, 0, 800, 400);
       drawState(arrayStates[i]);
    }, i * 500);
    })(i);
  }
}

const drawState = currentState => {
    for (let i = 0, currentStateLength = currentState.length; i < currentStateLength; i++) {
      const xPosition = 800 - (75 * (i + 1)), canvasWidth = 400;
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.moveTo(xPosition, canvasWidth);
      ctx.lineTo(xPosition, currentState[i] * canvasWidth / currentStateLength);
      ctx.strokeStyle = "#FFF"
      ctx.stroke();
    }
}
