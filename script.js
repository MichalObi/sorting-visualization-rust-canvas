const webassembly_js = import('./rust-sorting/pkg/rust_sorting.js');
webassembly_js.then(wasmModule => {
  const array = [1,2,3,4],
        algoType = 'bubble';

  const webassembkyText = wasmModule.rust_sort(algoType);

  const ctx = document.getElementById('canvas').getContext('2d');
  ctx.font = '48px serif';
  ctx.fillText(webassembkyText, 10, 50);

  const sortedArray = wasmModule.send_js_array(array);
  ctx.fillText(sortedArray, 5, 100);

  const config = {algoType, array};
  const appContext = wasmModule.run_app(config);

  appContext.set_algo_type('gnome');
  console.log('Algo type: ', appContext.get_algo_type());

  appContext.set_array([11, 21, 123, 321, 12]);
  console.log('Array: ', appContext.get_array());
});
