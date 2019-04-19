extern crate js_sys;
extern crate wasm_bindgen;
extern crate wasm_bindgen_test;
extern crate web_sys;

use js_sys::{Array, Math, JSON};
use wasm_bindgen::prelude::JsValue;
use wasm_bindgen_test::*;

#[cfg(not(test))]
use web_sys::{console, window};

use crate::algorithms::Algorithm;
use crate::SortArray;

pub struct BubbleSort;

#[cfg(not(test))]
fn log_performance(performance: &JsValue) {
    console::log_2(&"Rust bubble sort time info (ms): ".into(), performance);
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

    assert_eq!(
        String::from(
            JSON::stringify(&BubbleSort::sort(
                SortArray::new(array),
                false,
                &JsValue::from(10)
            ))
            .unwrap()
        ),
        String::from(JSON::stringify(&JsValue::from(&js_array_after_sort)).unwrap()),
    );
}

impl Algorithm for BubbleSort {
    fn sort(array: SortArray, with_visual: bool, speed: &JsValue) -> JsValue {
        #[cfg(not(test))]
        let sort_start: f64 = measure_performance();
        let len: u8 = array.get_array_len() as u8;

        if with_visual {
            #[cfg(not(test))]
            use crate::current_array_state;
            #[cfg(not(test))]
            current_array_state(&array.state.clone())
        }

        for i in 0..len - 1 {
            for j in 0..len - i - 1 {
                let current: JsValue = JsValue::from(j);
                let next: JsValue = JsValue::from(j + 1);

                let current_f64_val: f64 = array.get_array_val_by_index(&current).as_f64().unwrap();

                let next_f64_val: f64 = array.get_array_val_by_index(&next).as_f64().unwrap();

                if Math::max(current_f64_val, next_f64_val) as u8 == current_f64_val as u8 {
                    array.swap(&current, &next);

                    if with_visual {
                        #[cfg(not(test))]
                        use crate::current_array_state;
                        #[cfg(not(test))]
                        current_array_state(&array.state.clone())
                    }
                }
            }
        }

        #[cfg(not(test))]
        log_performance(&JsValue::from_f64(measure_performance() - sort_start));

        if with_visual {
            #[cfg(not(test))]
            use crate::update_canvas_with_new_state;
            #[cfg(not(test))]
            update_canvas_with_new_state(speed)
        }

        array.state.clone()
    }
}
