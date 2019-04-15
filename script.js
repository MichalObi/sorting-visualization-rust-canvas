const webassembly_js = import('./rust-sorting/pkg/rust_sorting.js');

const algoType = 'bubble',
      withVisual = true,
      shuffle = arr => arr.sort(() => Math.random() - 0.5),
      length = 10,
      initialArray = Array(length).fill().map((v, i) => i + 1);
      shuffledArray = shuffle(initialArray.slice());
      config = {algoType, withVisual, array: shuffledArray.slice()},
      $startBtn = document.getElementById('start'),
      ctx = document.getElementById('canvas').getContext('2d');

webassembly_js.then(wasmModule => {

  const appContext = wasmModule.run_app(config),
        selectedAlgoType = appContext.get_algo_type();

  const sortStart = () => {
    $startBtn.disabled = true;
    if (withVisual) {
      appContext.sort();
      // cb will be trigger in utils.js
    } else {
      const jsArrSortStart = performance.now();
      initialArray.slice().sort()
      const jsArrSortStop = performance.now();
      const jsArraySortTime = jsArrSortStop - jsArrSortStart;
      console.log(`Call to js array sort ${jsArraySortTime} ms`);

      const rustArraySortStart = performance.now();
      const arrayAfterSort = appContext.sort();
      const rustArraySortStop = performance.now();
      const rustArraySortTime = rustArraySortStop - rustArraySortStart;
      console.log(`Call to rust array sort ${rustArraySortTime} ms`);

      ctx.clearRect(0, 0, 800, 400);

      ctx.font = '28px serif';
      ctx.fillText(`Selected algo type: ${selectedAlgoType}`, 5, 50);
      ctx.fillText(`Initial Array: ${initialArray}`, 5, 100);
      ctx.fillText(`Shuffled Array: ${shuffledArray}`, 5, 150);
      ctx.fillText(`Sorted in RUST Array: ${arrayAfterSort}`, 5, 200);
    }
  }

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 800, 400);

  $startBtn.addEventListener('click', sortStart);
});
