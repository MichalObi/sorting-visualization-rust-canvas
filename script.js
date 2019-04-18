const webassembly_js = import('./rust-sorting/pkg/rust_sorting.js');

const $algoSelect = document.getElementById('algo-type'),
      $sizeSelect = document.getElementById('size'),
      $speedSelect = document.getElementById('speed'),
      $startBtn = document.getElementById('start'),
      $withVisualCheckbox = document.getElementById('with-visual'),
      ctx = document.getElementById('canvas').getContext('2d'),
      canvasWidth = 800,
      canvasHeight = 400,
      bcgColor = '#000',
      fontColor = '#FFF',
      textFont = '28px serif',
      speedInMs = {
        slow: 500,
        normal: 250,
        fast: 0
      }

let sortArrays = {},
    withVisual = null;

webassembly_js.then(wasmModule => {

  const prepareConfig = () => {
    withVisual = $withVisualCheckbox.checked;
    const algoType = $algoSelect.options[$algoSelect.selectedIndex].value,
        shuffle = arr => arr.sort(() => Math.random() - 0.5),
        length = parseInt($sizeSelect.options[$sizeSelect.selectedIndex].value),
        speed = speedInMs[$speedSelect.options[$speedSelect.selectedIndex].value],
        initialArray = Array(length).fill().map((v, i) => i + 1);
        shuffledArray = shuffle(initialArray.slice());
        sortArrays = {initialArray, shuffledArray};
        return {algoType, withVisual, speed, array: shuffledArray.slice()};
  }

  const prepareArrayDisplay = array =>
        array.length <= 10 ? array : `${array.slice(0, 10)} ...`;

  const sortStart = () => {

    const config = prepareConfig(),
          appContext = wasmModule.run_app(config),
          selectedAlgoType = appContext.get_algo_type();

    $startBtn.disabled = true;

    if (withVisual) {
      appContext.sort();
      // cb will be trigger in utils.js
    } else {
      const jsArrSortStart = performance.now();
      sortArrays.initialArray.slice().sort()
      const jsArrSortStop = performance.now();
      const jsArraySortTime = jsArrSortStop - jsArrSortStart;

      const rustArraySortStart = performance.now();
      const arrayAfterSort = appContext.sort();
      const rustArraySortStop = performance.now();
      const rustArraySortTime = rustArraySortStop - rustArraySortStart;

      ctx.fillStyle = bcgColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.font = textFont;
      ctx.fillStyle = fontColor;

      ctx.fillText(`Selected algo type: ${selectedAlgoType}`, 5, 50);
      ctx.fillText(`Array size: ${sortArrays.initialArray.length}`, 5, 100);
      ctx.fillText(`Initial Array: ${prepareArrayDisplay(sortArrays.initialArray)}`, 5, 150);
      ctx.fillText(`Shuffled Array: ${prepareArrayDisplay(sortArrays.shuffledArray)}`, 5, 200);
      ctx.fillText(`Sorted in RUST Array: ${prepareArrayDisplay(arrayAfterSort)}`, 5, 250);
      ctx.fillText(`Call to js array sort ${jsArraySortTime} ms`, 5, 300);
      ctx.fillText(`Call to rust array sort ${rustArraySortTime} ms`, 5, 350);

      $startBtn.disabled = false;
    }
  }

  ctx.fillStyle = bcgColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  $startBtn.addEventListener('click', sortStart);
});
