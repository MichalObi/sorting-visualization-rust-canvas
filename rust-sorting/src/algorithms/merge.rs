extern crate js_sys;
use crate::algorithms::Algorithm;
use crate::SortArray;
use js_sys::Array;
use wasm_bindgen::prelude::JsValue;

pub struct MergeSort;

impl Algorithm for MergeSort {
    fn sort(array: SortArray, with_visual: bool, speed: &JsValue) -> JsValue {
        merge_sort(&array, 0, array.get_array_len() - 1)
    }
}

fn merge_sort(array: &SortArray, left: u32, right: u32) -> JsValue {
    if left < right {
        let middle = (left + right) / 2;

        merge_sort(array, left, middle);
        merge_sort(array, middle + 1, right);

        merge(array, left, middle, right)
    } else {
        array.state.clone()
    }
}

fn merge(array: &SortArray, left: u32, middle: u32, right: u32) -> JsValue {
    let left_size = middle - left + 1;
    let right_size = right - middle;

    let left_array = sub_array(array, left, left_size);
    let right_array = sub_array(array, middle + 1, right_size);

    let mut i = 0;
    let mut j = 0;
    let mut k = left;

    while i < left_size && j < right_size {
        let left_val = left_array.get_array_val_by_index(&JsValue::from(i));
        let right_val = right_array.get_array_val_by_index(&JsValue::from(j));

        if left_val.as_f64().unwrap() <= right_val.as_f64().unwrap() {
            array.set_array_val_by_index(&JsValue::from(k), &left_val);
            i += 1;
        } else {
            array.set_array_val_by_index(&JsValue::from(k), &right_val);
            j += 1;
        }
        k += 1;
    }

    while i < left_size {
        let left_val = left_array.get_array_val_by_index(&JsValue::from(i));
        array.set_array_val_by_index(&JsValue::from(k), &left_val);
        i += 1;
        k += 1;
    }

    while j < right_size {
        let right_val = right_array.get_array_val_by_index(&JsValue::from(j));
        array.set_array_val_by_index(&JsValue::from(k), &right_val);
        j += 1;
        k += 1;
    }

    array.state.clone()
}

fn sub_array(array: &SortArray, begin: u32, size: u32) -> SortArray {
    let sort_array = SortArray::new(JsValue::from(Array::new()));

    for i in 0..size {
        let val = array.get_array_val_by_index(&JsValue::from(begin + i));
        let current_index = JsValue::from(i);
        sort_array.set_array_val_by_index(&current_index, &val);
    }

    sort_array
}
