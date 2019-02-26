const webassembly_js = import('./rust-sorting/pkg/rust_sorting.js');
webassembly_js.then(wasmModule => {

  const ctx = document.getElementById('canvas').getContext('2d');
        array = [1, 2, 3, 4],
        algoType = 'bubble',
        config = {algoType, array};

  const appContext = wasmModule.run_app(config);
  const arrayToSort = appContext.get_array();
  const selectedAlgoType = appContext.get_algo_type();

  ctx.font = '48px serif';
  ctx.fillText(arrayToSort, 10, 50);
  ctx.fillText(selectedAlgoType, 5, 100);
});
