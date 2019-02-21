const webassembly_js = import('./rust-sorting/pkg/rust_sorting.js');
webassembly_js.then(wasmModule => {
  const webassembkyText = wasmModule.rust_sort('bubble');
  const ctx = document.getElementById('canvas').getContext('2d');
  ctx.font = '48px serif';
  ctx.fillText(webassembkyText, 10, 50);
  const sortedArray = wasmModule.send_js_array([1,2,3,4]);
  ctx.fillText(sortedArray, 5, 100);
  const test = wasmModule.get_js_array_val_by_index([1,2,3], 0);
  console.log('test', test);
});
