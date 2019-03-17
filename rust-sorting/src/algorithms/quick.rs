use wasm_bindgen::prelude::JsValue;

use crate::algorithms::Algorithm;
use crate::SortArray;

pub struct QuickSort;

impl Algorithm for QuickSort {
    fn sort(array: SortArray) -> JsValue {
        sort_slice(&array, 0, array.get_array_len() as isize - 1)
    }
}

fn sort_slice(array: &SortArray, low: u32, high: u32) {
    if low < high {
        let pivot = partition(array, low, high);
        sort_slice(array, low, pivot - 1);
        sort_slice(array, pivot + 1, high);
    }
}

fn partition(array: &SortArray, low: u32, high: u32) -> u32 {
    let pivot = array.get_array_val_by_index(&JsValue::from(high));
    let mut i = low;
    for j in low..high {
        let current = array.get_array_val_by_index(&JsValue::from(j));

        if current <= pivot {
            array.swap()
        }
    }
    i
}
