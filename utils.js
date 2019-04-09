let counter = 0,
    arrayStates = [];

const ctx = document.getElementById('canvas').getContext('2d');

export const current_array_state = array => {
  ++counter
  arrayStates.push(JSON.parse(JSON.stringify(array))); // push copy by value
}

export const update_canvas_with_new_state = () => {
  for (let i = 0, arrayStatesLength = arrayStates.length; i < arrayStatesLength; i++) {
    ctx.clearRect(0, 0, 800, 400);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 800, 400);

    if (i === 0) {  // tmp
      console.log('arrayStates[i])', arrayStates[i]);
      window.requestAnimationFrame(() => drawState(arrayStates[i]));
    }
  }
}

const drawState = currentState => {
    for (let i = 1, currentStateLength = currentState.length; i <= currentStateLength; i++) {
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(20 * i, 20);
      ctx.lineTo(20 * i, currentState[i] === 10 ? 380 : currentState[i] * 380 / 10);
      ctx.strokeStyle = "#FFF"
      ctx.stroke();
    }
}
