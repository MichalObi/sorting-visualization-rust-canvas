const webassembly_js = import('./rust-sorting/pkg/rust_sorting.js');

export function current_array_state(array) {
  console.log('array', array);
}

const fillRandom = () => Math.floor(Math.random() * length);
const shuffle = arr => arr.sort(() => Math.random() - 0.5);

const algoType = 'bubble',
      withVisual = true,
      length = 10;
      initialArray = Array.from({length}, fillRandom),
      shuffledArray = shuffle(initialArray.slice());
      config = {algoType, withVisual, array: shuffledArray.slice()};

webassembly_js.then(wasmModule => {

  const appContext = wasmModule.run_app(config),
        selectedAlgoType = appContext.get_algo_type();

  if (withVisual) {
    console.log('with visual');
    appContext.sort();
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

    const ctx = document.getElementById('canvas').getContext('2d');
    ctx.clearRect(0, 0, 500, 500);

    ctx.font = '28px serif';
    ctx.fillText(`Selected algo type: ${selectedAlgoType}`, 5, 50);
    ctx.fillText(`Initial Array: ${initialArray}`, 5, 100);
    ctx.fillText(`Shuffled Array: ${shuffledArray}`, 5, 150);
    ctx.fillText(`Sorted in RUST Array: ${arrayAfterSort}`, 5, 200);
  }
});
