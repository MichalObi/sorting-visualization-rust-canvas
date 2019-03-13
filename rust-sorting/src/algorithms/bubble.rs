extern crate js_sys;
extern crate wasm_bindgen;
extern crate wasm_bindgen_test;
extern crate web_sys;

use crate::SortArray;
use js_sys::{Array, Math};
use wasm_bindgen::prelude::JsValue;
use wasm_bindgen_test::*;

#[cfg(not(test))]
use web_sys::{console, window};

pub struct BubbleSort;

pub trait Algorithm {
    fn sort(array: SortArray) -> JsValue;
}

#[cfg(not(test))]
fn log_performance(performance: JsValue) {
    console::log_2(&"Rust bubble sort time info (ms): ".into(), &performance);
}

#[cfg(not(test))]
fn measure_performance() -> f64 {
    window().unwrap().performance().unwrap().now()
}

#[wasm_bindgen_test]
fn test_algo() {
    let js_array_to_sort = Array::of3(&JsValue::from(1), &JsValue::from(3), &JsValue::from(2));
    let js_array_after_sort = Array::of3(&JsValue::from(1), &JsValue::from(2), &JsValue::from(3));
    let array = JsValue::from(&js_array_to_sort);

    // to compare need data as string not array
    assert_eq!(
        BubbleSort::sort(SortArray::new(array)),
        JsValue::from(&js_array_after_sort),
    );
}

impl Algorithm for BubbleSort {
    fn sort(array: SortArray) -> JsValue {
        #[cfg(not(test))]
        let sort_start: f64 = measure_performance();
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

        #[cfg(not(test))]
        log_performance(JsValue::from_f64(measure_performance() - sort_start));
        array.state.clone()
    }
}
