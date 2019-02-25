const webassembly_js = import('./rust-sorting/pkg/rust_sorting.js');
webassembly_js.then(wasmModule => {

  const array = [1,2,3,4],
        algoType = 'bubble';

  const config = {algoType, array};
  const appContext = wasmModule.run_app(config);

  appContext.set_array([11, 21, 123, 321, 12]);
  appContext.set_algo_type('gnome');

  const sortedArray = appContext.get_array();

  const webassembkyText = appContext.get_algo_type();

  const ctx = document.getElementById('canvas').getContext('2d');
  ctx.font = '48px serif';

  ctx.fillText(webassembkyText, 10, 50);
  ctx.fillText(sortedArray, 5, 100);

  console.log('Array length: ', appContext.get_array_len());
  console.log('Array first index val: ', appContext.get_array_val_by_index(0));

  appContext.set_array_val_by_index(0, 5);

  console.log('Array first index val after change: ',
    appContext.get_array_val_by_index(0));
});
