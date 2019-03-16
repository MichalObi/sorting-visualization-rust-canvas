use wasm_bindgen::prelude::JsValue;

use crate::SortArray;
use crate::algorithms::Algorithm;

pub struct QuickSort;

impl Algorithm for QuickSort {
    fn sort(array: SortArray) -> JsValue {
        array.state.clone()
    }
}
