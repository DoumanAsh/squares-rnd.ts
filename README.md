# squares-rnd

Simple and fast counter based non-crypto random generator using embedded WASM module.

The algorithm is based on `Middle Square Weyl Sequence RNG`.
See [paper](https://arxiv.org/abs/2004.06278v7) for details.

**NOTE**: Not cryptographically secure.

There are several note-worthy properties to the algorithm:

- State is represented by counter, which is incremented to produce new value, hence making
it easy to predict how state would change.
- `key` must have close to equal number of zeroes and ones for optimal output.

Sample keys can be found in this [gist](https://gist.githubusercontent.com/DoumanAsh/a57bc65434702d5d7fb88343c65f3145/raw/a9b45f7155c483f689318ee501222e72be0d66ec/keys)
