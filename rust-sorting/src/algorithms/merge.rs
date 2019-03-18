use crate::algorithms::Algorithm;
use crate::SortArray;
use wasm_bindgen::prelude::JsValue;

pub struct MergeSort;

impl Algorithm for MergeSort {
    fn sort(array: SortArray) -> JsValue {
        array.state.clone()
    }
}
