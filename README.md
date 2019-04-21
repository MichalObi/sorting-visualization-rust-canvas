# Rust sorting

Short start - use docker image (in progress ...)

```
docker build -t <user>/node-sorting-visualization-rust-canvas .

docker run --rm --net=host <user>/node-sorting-visualization-rust-canvas
```

1) Install JS and Rust dep

```
npm i / cargo install wasm-pack
```

2) Be sure you have rust compiler in Nightly channel

```
rustc --version
```

3) Build with [wasm-pack]

```
wasm-pack build (--release)
```

4) Run JS (Chrome 73 + / Firefox 66 +)

```
npm run serve
```

5) Check tests

```
wasm-pack test --chrome --headless
```
[wasm-pack]: https://github.com/rustwasm/wasm-pack
