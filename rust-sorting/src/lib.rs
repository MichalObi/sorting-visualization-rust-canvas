extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

// #[wasm_bindgen]
// pub fn print_js_error() -> String {
//     "Some error".into()
// }
//
// #[wasm_bindgen]
// pub fn sort_js_array(array: Box<[JsValue]>) -> Box<[JsValue]>  {
//     vec![JsValue::NULL, JsValue::UNDEFINED].into_boxed_slice()
// }

#[wasm_bindgen]
pub fn send_js_array(array: Option<Box<[JsValue]>>) -> Option<Box<[JsValue]>> {
    array
}

#[wasm_bindgen]
pub fn rust_sort(algo: String) -> String {
    algo
}
