extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

use js_sys::*;
use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
pub struct App {
    algo_type: JsValue,
    array: JsValue,
}

#[wasm_bindgen]
impl App {
    #[wasm_bindgen(constructor)]
    pub fn new(algo_type: JsValue, array: JsValue) -> App {
        App { algo_type, array }
    }

    pub fn get_algo_type(&self) -> JsValue {
        self.algo_type.to_owned()
    }

    pub fn get_array(&self) -> JsValue {
        self.array.clone()
    }

    pub fn set_algo_type(&mut self, algo_type: JsValue) {
        self.algo_type = algo_type
    }

    pub fn set_array(&mut self, array: JsValue) {
        self.array = array
    }

    pub fn get_array_len(&self) -> u32 {
        Array::length(&Array::from(&self.array))
    }

    pub fn get_array_val_by_index(&self, index: &JsValue) -> JsValue {
        Reflect::get(&self.array, &index).unwrap()
    }

    pub fn set_array_val_by_index(&self, index: &JsValue, val: &JsValue) -> bool {
        Reflect::set(&self.array, &index, &val).unwrap()
    }

    pub fn swap(&self, a: &JsValue, b: &JsValue) {
        let a_val = self.get_array_val_by_index(&a.clone());
        let b_val = self.get_array_val_by_index(&b.clone());
        self.set_array_val_by_index(&a, &b_val);
        self.set_array_val_by_index(&b, &a_val);
    }

    pub fn sort(&self) {
        let len: u32 = self.get_array_len();

        for i in 0..len - 1 {

            let last: u32 = len - i - 1;

            for j in 0..last {
                let current: JsValue = self.get_array_val_by_index(&JsValue::from(j));
                let next: JsValue = self.get_array_val_by_index(&JsValue::from(j + 1));

                if (current > next) {

                }
            }
        }
    }
}

#[wasm_bindgen]
pub fn run_app(config: Object) -> App {
    let first_index: JsValue = JsValue::from(0);
    let second_index: JsValue = JsValue::from(1);
    let values: Array = Object::values(&config);
    let algo_type = Reflect::get(&values, &first_index).unwrap();
    let array = Reflect::get(&values, &second_index).unwrap();
    App::new(algo_type, array)
}

// #[wasm_bindgen]
// pub fn sort_js_array(array: Box<[JsValue]>) -> Box<[JsValue]> {
//     array
// }
//
// #[wasm_bindgen]
// pub fn send_js_array(array: Option<Box<[JsValue]>>) -> Box<[JsValue]> {
//     match array {
//         Some(ref a) => {
//             let array_cpy = a.clone();
//             sort_js_array(array_cpy)
//         }
//         None => {
//             let error_msg = "Some error ...";
//             Box::new([JsValue::from_str(&error_msg)])
//         }
//     }
// }
