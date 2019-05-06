use crate::algorithms::Algorithm;
use crate::SortArray;
use wasm_bindgen::prelude::JsValue;

pub struct QuickSort;

impl Algorithm for QuickSort {
    fn sort(array: SortArray, with_visual: bool, speed: &JsValue) -> JsValue {
        sort_slice(
            &array,
            0 as i8,
            (array.get_array_len() - 1) as i8,
            with_visual,
            speed,
        )
    }
}

fn sort_slice(array: &SortArray, low: i8, high: i8, with_visual: bool, speed: &JsValue) -> JsValue {
    if low < high {
        let pivot = partition(array, low, high, with_visual);
        sort_slice(array, low, pivot - 1, with_visual, speed);
        sort_slice(array, pivot + 1, high, with_visual, speed)
    } else {
        if with_visual {
            #[cfg(not(test))]
            use crate::update_canvas_with_new_state;
            #[cfg(not(test))]
            update_canvas_with_new_state(speed)
        }

        array.state.clone()
    }
}

fn update_current_js_state(state: &JsValue) {
    #[cfg(not(test))]
    use crate::current_array_state;
    #[cfg(not(test))]
    current_array_state(state)
}

fn partition(array: &SortArray, low: i8, high: i8, with_visual: bool) -> i8 {
    let pivot_js_val = array.get_array_val_by_index(&JsValue::from(high));
    let pivot_i8_val: i8 = pivot_js_val.as_f64().unwrap() as i8;

    let mut i = low;

    for j in low..high {
        let current_js_val = array.get_array_val_by_index(&JsValue::from(j));
        let current_i8_val: i8 = current_js_val.as_f64().unwrap() as i8;

        if current_i8_val <= pivot_i8_val {
            array.swap(&JsValue::from(i), &JsValue::from(j));

            if with_visual {
                update_current_js_state(&array.state.clone());
            }

            i += 1;
        }
    }

    array.swap(&JsValue::from(i), &JsValue::from(high));

    if with_visual {
        update_current_js_state(&array.state.clone());
    }

    i
}
