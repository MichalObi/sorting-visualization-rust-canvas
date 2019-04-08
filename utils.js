export const current_array_state = array => {
  updateCanvasWithNewState(array)
}

let counter = 0,
    states = [];

const updateCanvasWithNewState = array => {
  ++counter
  states.push(JSON.stringify(array));
  
  const ctx = document.getElementById('canvas').getContext('2d');
  ctx.clearRect(0, 0, 500, 500);
}
