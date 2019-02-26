const webassembly_js = import('./rust-sorting/pkg/rust_sorting.js');

const shuffle = arr => arr.sort(() => Math.random() - 0.5);

const algoType = 'bubble',
      initialArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      shuffledArray = shuffle(initialArray.slice());
      config = {algoType, array: shuffledArray.slice()};

webassembly_js.then(wasmModule => {

  const appContext = wasmModule.run_app(config),
        selectedAlgoType = appContext.get_algo_type(),
        arrayAfterSort = appContext.sort();

  const ctx = document.getElementById('canvas').getContext('2d');

  ctx.clearRect(0, 0, 500, 500);

  ctx.font = '28px serif';
  ctx.fillText(`Selected algo type: ${selectedAlgoType}`, 5, 50);
  ctx.fillText(`Initial Array: ${initialArray}`, 5, 100);
  ctx.fillText(`Shuffled Array: ${shuffledArray}`, 5, 150);
  ctx.fillText(`Sorted in RUST Array: ${arrayAfterSort}`, 5, 200);
});
