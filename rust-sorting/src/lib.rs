extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn rust_sort(algo: String) -> String {
    algo
}
