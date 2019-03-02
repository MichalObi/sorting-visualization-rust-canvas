extern crate js_sys;
extern crate wasm_bindgen;
use crate::SortArray;
use js_sys::*;
use wasm_bindgen::prelude::*;

pub trait Algorithm {
    fn sort(array: SortArray) -> SortArray;
}

pub struct BubbleSort;

impl Algorithm for BubbleSort {
    fn sort(array: SortArray) -> SortArray {
        let len: u32 = array.get_array_len();

        for i in 0..len - 1 {
            let last: u32 = len - i - 1;

            for j in 0..last {
                let current: JsValue = JsValue::from(j);
                let next: JsValue = JsValue::from(j + 1);

                let current_js_val: JsValue = array.get_array_val_by_index(&current);
                let next_js_val: JsValue = array.get_array_val_by_index(&next);

                let current_f64_val: f64 = current_js_val.as_f64().unwrap();
                let next_f64_val: f64 = next_js_val.as_f64().unwrap();

                let grater: f64 = Math::max(current_f64_val, next_f64_val);

                if grater == current_f64_val {
                    array.swap(&current, &next)
                }
            }
        }

        array.clone()
    }
}
