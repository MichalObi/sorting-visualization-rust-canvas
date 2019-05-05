extern crate js_sys;
extern crate wasm_bindgen;
extern crate wasm_bindgen_test;
extern crate web_sys;

use js_sys::{Array, Object, Reflect};
use wasm_bindgen::prelude::*;
use wasm_bindgen_test::*;
use web_sys::console;

mod algorithms;
use crate::algorithms::bubble::BubbleSort;
use crate::algorithms::merge::MergeSort;
use crate::algorithms::quick::QuickSort;
use crate::algorithms::Algorithm;

#[cfg(not(test))]
#[wasm_bindgen(raw_module = "./../../utils")]
extern "C" {
    pub fn current_array_state(array: &JsValue);
    pub fn update_canvas_with_new_state(speed: &JsValue);
}

#[wasm_bindgen]
#[derive(Clone, PartialEq, Debug)]
pub struct SortArray {
    state: JsValue,
}

impl SortArray {
    pub fn new(state: JsValue) -> SortArray {
        SortArray { state }
    }

    fn get_array_len(&self) -> u32 {
        Array::length(&Array::from(&self.state))
    }

    fn get_array_val_by_index(&self, index: &JsValue) -> JsValue {
        Reflect::get(&self.state, &index).unwrap()
    }

    fn set_array_val_by_index(&self, index: &JsValue, val: &JsValue) -> bool {
        Reflect::set(&self.state, &index, &val).unwrap()
    }

    fn swap(&self, a: &JsValue, b: &JsValue) {
        let a_val = self.get_array_val_by_index(a);
        let b_val = self.get_array_val_by_index(b);
        self.set_array_val_by_index(&a, &b_val);
        self.set_array_val_by_index(&b, &a_val);
    }
}

#[wasm_bindgen]
#[derive(PartialEq, Debug)]
pub struct App {
    algo_type: JsValue,
    with_visual: bool,
    speed: JsValue,
    array: SortArray,
}

#[wasm_bindgen]
impl App {
    pub fn new(algo_type: JsValue, with_visual: bool, speed: JsValue, array: SortArray) -> App {
        App {
            algo_type,
            with_visual,
            speed,
            array,
        }
    }

    pub fn get_algo_type(&self) -> JsValue {
        self.algo_type.to_owned()
    }

    pub fn get_with_visual(&self) -> bool {
        self.with_visual
    }

    pub fn get_speed(&self) -> JsValue {
        self.speed.to_owned()
    }

    pub fn get_array(&self) -> SortArray {
        self.array.clone()
    }

    pub fn set_algo_type(&mut self, algo_type: JsValue) {
        self.algo_type = algo_type
    }

    pub fn set_array(&mut self, array: SortArray) {
        self.array = array
    }

    pub fn sort(&self) -> JsValue {
        let algo_type = self.get_algo_type().as_string().unwrap();
        let array = self.get_array();
        let with_visual = self.get_with_visual();
        let speed = self.get_speed();

        if algo_type == "bubble" {
            BubbleSort::sort(array, with_visual, &speed)
        } else if algo_type == "quick" {
            QuickSort::sort(array, with_visual, &speed)
        } else if algo_type == "merge" {
            MergeSort::sort(array, with_visual, &speed)
        } else {
            JsValue::from_str(&"Algo type not found")
        }
    }
}

pub fn does_js_val_exist(val: &JsValue) -> bool {
    !(JsValue::is_null(val) || JsValue::is_undefined(val))
}

#[wasm_bindgen]
pub fn run_app(config: Object) -> App {
    // Initialize debug logging for if/when things go wrong.
    console_error_panic_hook::set_once();

    let first_index: JsValue = JsValue::from(0);
    let second_index: JsValue = JsValue::from(1);
    let third_index: JsValue = JsValue::from(2);
    let fourth_index: JsValue = JsValue::from(3);

    let values: Array = Object::values(&config);
    let algo_type = Reflect::get(&values, &first_index).unwrap();
    let with_visual = Reflect::get(&values, &second_index).unwrap();
    let speed = Reflect::get(&values, &third_index).unwrap();
    let state = Reflect::get(&values, &fourth_index).unwrap();

    if does_js_val_exist(&algo_type) && does_js_val_exist(&state) {
        App::new(
            algo_type,
            with_visual.as_bool().unwrap(),
            speed,
            SortArray::new(state),
        )
    } else {
        console::log_1(&"Error on app create - check send config".into());
        panic!();
    }
}

#[wasm_bindgen_test]
fn test_run_app() {
    let config = Object::new();
    let algo_type_key = JsValue::from_str(&String::from("algoType"));
    let algo_type = JsValue::from_str(&String::from("bubble"));
    let speed_key = JsValue::from_str(&String::from("speed"));
    let speed = JsValue::from_str(&String::from("10"));
    let with_visual_key = JsValue::from_str(&String::from("withVisual"));
    let with_visual_js = JsValue::from_bool(true);
    let state_key = JsValue::from_str(&String::from("state"));

    let js_array_as_string =
        Array::of3(&JsValue::from(1), &JsValue::from(2), &JsValue::from(3)).to_string();

    let array = JsValue::from(&js_array_as_string);

    Reflect::set(&config, &algo_type_key, &algo_type).unwrap();
    Reflect::set(&config, &with_visual_key, &with_visual_js).unwrap();
    Reflect::set(&config, &speed_key, &speed).unwrap();
    Reflect::set(&config, &state_key, &array).unwrap();

    let with_visual = with_visual_js.as_bool().unwrap();

    assert_eq!(
        run_app(config),
        App {
            algo_type,
            with_visual,
            speed,
            array: SortArray::new(array)
        }
    )
}
