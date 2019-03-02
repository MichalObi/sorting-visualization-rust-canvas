extern crate js_sys;
extern crate wasm_bindgen;
use crate::SortArray;
use js_sys::*;
use wasm_bindgen::prelude::*;

pub struct BubbleSort;

pub trait Algorithm {
    fn sort(array: SortArray) -> JsValue;
}

impl Algorithm for BubbleSort {
    fn sort(array: SortArray) -> JsValue {
        array.state.clone()
    }
}
