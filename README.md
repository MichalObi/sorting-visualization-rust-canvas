# Rust sorting

1) Install JS and Rust dep

```
npm i / cargo install
```

2) Be sure you have rust compiler in Nightly channel

```
rustc --version
```

3) Build with [wasm-pack]

```
wasm-pack build
```

4) Run JS

```
npm run serve
```

5) Check tests

```
wasm-pack test --chrome
```

[wasm-pack]: : https://github.com/rustwasm/wasm-pack
