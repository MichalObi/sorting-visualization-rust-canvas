extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

use js_sys::*;
use wasm_bindgen::prelude::*;
use web_sys::console;

use crate::algorithms::bubble::Algorithm;
use crate::algorithms::bubble::BubbleSort;

mod algorithms;

#[wasm_bindgen]
pub struct SortArray {
    state: JsValue,
}

impl Clone for SortArray {
    fn clone(&self) -> SortArray {
        self.to_owned()
    }
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
        let a_val = self.get_array_val_by_index(&a.clone());
        let b_val = self.get_array_val_by_index(&b.clone());
        self.set_array_val_by_index(&a, &b_val);
        self.set_array_val_by_index(&b, &a_val);
    }
}

#[wasm_bindgen]
pub struct App {
    algo_type: JsValue,
    array: SortArray,
}

#[wasm_bindgen]
impl App {
    pub fn new(algo_type: JsValue, array: SortArray) -> App {
        App { algo_type, array }
    }

    pub fn get_algo_type(&self) -> JsValue {
        self.algo_type.to_owned()
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

    pub fn sort(&self) -> SortArray {
        let array = self.get_array();
        BubbleSort::sort(array)
    }
}

pub fn does_js_val_exist(val: &JsValue) -> bool {
    !(JsValue::is_null(val) || JsValue::is_undefined(val))
}

#[wasm_bindgen]
pub fn run_app(config: Object) -> App {
    let first_index: JsValue = JsValue::from(0);
    let second_index: JsValue = JsValue::from(1);
    let values: Array = Object::values(&config);
    let algo_type = Reflect::get(&values, &first_index).unwrap();
    let state = Reflect::get(&values, &second_index).unwrap();

    if does_js_val_exist(&algo_type) && does_js_val_exist(&state) {
        App::new(algo_type, SortArray::new(state))
    } else {
        console::log_1(&"Error on app create - check send config".into());
        panic!();
    }
}
