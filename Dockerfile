# Base docker img
FROM node:11.14.0

# Create app directory
WORKDIR /usr/src/app

# Install Rust with nightly channel and wasm-pack
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH=/root/.cargo/bin:$PATH
RUN rustup install nightly
RUN rustup override set nightly
RUN rustup target add wasm32-unknown-unknown --toolchain nightly
RUN cargo install wasm-pack

# Install app FE dependencies
COPY package*.json ./
RUN npm install
COPY . .

# Install rust app
RUN cd ./rust-sorting && wasm-pack build --release

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
