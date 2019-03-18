use crate::SortArray;
use wasm_bindgen::prelude::JsValue;

pub mod bubble;
pub mod merge;
pub mod quick;

pub trait Algorithm {
    fn sort(array: SortArray) -> JsValue;
}
