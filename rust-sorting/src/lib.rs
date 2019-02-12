extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn get_test_text() -> String {
    "Hello from rust!".into()
}
