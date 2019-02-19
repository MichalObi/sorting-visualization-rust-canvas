extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

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
