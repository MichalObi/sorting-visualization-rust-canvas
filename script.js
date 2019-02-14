const webassembly_js = import('./rust-sorting/pkg/rust_sorting.js');
webassembly_js.then(wasmModule => {
  const webassembkyText = wasmModule.rust_sort('bubble');
  const ctx = document.getElementById('canvas').getContext('2d');
  ctx.font = '48px serif';
  ctx.fillText(webassembkyText, 10, 50);
  const sortedArray = wasmModule.send_js_array([1,2,3,4,5]);
  ctx.fillText(sortedArray, 5, 100);
});
