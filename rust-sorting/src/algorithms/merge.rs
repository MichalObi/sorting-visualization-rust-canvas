extern crate js_sys;
use crate::algorithms::Algorithm;
use crate::SortArray;
use wasm_bindgen::prelude::JsValue;
use js_sys::{Array};

pub struct MergeSort;

impl Algorithm for MergeSort {
    fn sort(array: SortArray) -> JsValue {
        merge_sort(&array, 0, array.get_array_len() - 1)
    }
}

fn merge_sort(array: &SortArray, left: u32, right: u32) -> JsValue {
    if left < right {
        let middle = (left + right) / 2;

        merge_sort(array, left, middle);
        merge_sort(array, middle + 1, right);

        merge(array, left, middle, right);
    } else {
        array.state.clone()
    }
}

fn merge(array: &SortArray, left: u32, middle: u32, right: u32) {
    let left_size = middle - left + 1;
    let right_size = right - middle;

    let left_array = sub_array(array, left, left_size);
    let right_array = sub_array(array, middle + 1, right_size);
}

fn sub_array(array: &SortArray, begin: u32, size: u32) -> JsValue {
    let array = Array::new();

    for i in 0..size {
        let val = array.get_array_val_by_index(&JsValue::from(begin + 1));;
    }
}
