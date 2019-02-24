extern crate js_sys;
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;
use js_sys::*;

#[wasm_bindgen]
pub struct App {
    algo_type: JsValue,
    array: JsValue
}

#[wasm_bindgen]
impl App {
    pub fn new(algo_type: JsValue, array: JsValue) -> App {
        App { algo_type, array}
    }

    // pub fn get_algo_type(&self) -> JsValue {
    //     self.algo_type
    // }
    //
    // pub fn get_array(&self) -> JsValue {
    //     self.array
    // }

    pub fn set_algo_type(&mut self, algo_type: JsValue) {
        self.algo_type = algo_type;
    }

    pub fn set(&mut self, array: JsValue) {
        self.array = array;
    }
}

#[wasm_bindgen]
pub fn run_app(config:Object) -> App {
    let first_index:JsValue = JsValue::from_f64(0.0);
    let second_index:JsValue =  JsValue::from_f64(1.0);
    let values:Array = Object::values(&config);
    let algo_type = Reflect::get(&values, &first_index).unwrap();
    let array = Reflect::get(&values, &second_index).unwrap();
    let test = App::new(algo_type, array);
    return test;
}

#[wasm_bindgen]
pub fn get_js_array_val_by_index(array:JsValue, index:JsValue) -> Result<JsValue, JsValue> {
    Reflect::get(&array, &index)
}

#[wasm_bindgen]
pub fn get_js_array_len(array: Box<[JsValue]>) -> Box<[JsValue]> {
    let len = array.len() as f64;
    Box::new([JsValue::from_f64(len)])
}

pub fn get_js_array_count(array: Box<[JsValue]>) -> Box<[JsValue]> {
    let mut count: f64 = 0.0;
    for i in 0..array.len() {
        count += i as f64
    }
    Box::new([JsValue::from_f64(count)])
}

#[wasm_bindgen]
pub fn sort_js_array(array: Box<[JsValue]>) -> Box<[JsValue]> {
    array
}

#[wasm_bindgen]
pub fn send_js_array(array: Option<Box<[JsValue]>>) -> Box<[JsValue]> {
    match array {
        Some(ref a) => {
            let array_cpy = a.clone();
            sort_js_array(array_cpy)
        }
        None => {
            let error_msg = "Some error ...";
            Box::new([JsValue::from_str(&error_msg)])
        }
    }
}

#[wasm_bindgen]
pub fn rust_sort(algo: String) -> String {
    algo
}
