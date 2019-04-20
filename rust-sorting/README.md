# Rust sorting

1) Install Rust by rustup (linux) and wasm-pack

```
curl https://sh.rustup.rs -sSf | sh / cargo install wasm-pack
```

2) Be sure you have rust compiler in Nightly channel

```
rustc --version
```

3) Build with [wasm-pack]

```
wasm-pack build (--dev / --release)
```

[wasm-pack]: https://github.com/rustwasm/wasm-pack
