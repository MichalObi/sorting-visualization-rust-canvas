use wasm_bindgen::prelude::JsValue;
use crate::algorithms::Algorithm;
use crate::SortArray;

pub struct QuickSort;

impl Algorithm for QuickSort {
    fn sort(array: SortArray) -> JsValue {
        sort_slice(&array, 0, array.get_array_len() - 1)
    }
}

fn sort_slice(array: &SortArray, low: u32, high: u32) -> JsValue {
    if low < high {
        let pivot = partition(array, low, high);
        sort_slice(array, low, pivot - 1);
        sort_slice(array, pivot + 1, high)
    } else {
        array.state.clone()
    }
}

fn partition(array: &SortArray, low: u32, high: u32) -> u32 {
    let pivot_js_val = array.get_array_val_by_index(&JsValue::from(high));
    let pivot_f64_val: f64 = pivot_js_val.as_f64().unwrap();

    let mut i = low;

    for j in low..high {
        let current_js_val = array.get_array_val_by_index(&JsValue::from(j));
        let current_f64_val: f64 = current_js_val.as_f64().unwrap();

        if current_f64_val <= pivot_f64_val {
            array.swap(&JsValue::from(i), &JsValue::from(j));
            i +=1;
        }
    }
    array.swap(&JsValue::from(i), &JsValue::from(high));
    i
}
