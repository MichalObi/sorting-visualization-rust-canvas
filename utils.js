let counter = 0,
    states = [];

export const current_array_state = array => {
  ++counter
  states.push(JSON.stringify(array));
}

export const update_canvas_with_new_state = () => {
  const ctx = document.getElementById('canvas').getContext('2d');
  ctx.clearRect(0, 0, 500, 500);
  ctx.font = '28px serif';
  ctx.fillText(`Sorted in: ${counter} steps`, 5, 50);
}
