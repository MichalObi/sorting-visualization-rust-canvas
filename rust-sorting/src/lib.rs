extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn get_js_array_len(array: Box<[JsValue]>) -> Box<[JsValue]> {
    let len = array.len() as f64;
    Box::new([JsValue::from_f64(len)])
}

pub fn get_js_array_count(array: Box<[JsValue]>) -> Box<[JsValue]> {
    let mut count:f64 = 0.0;
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
            get_js_array_count(array_cpy)
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
