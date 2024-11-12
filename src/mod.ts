type WasmInterface = {
    rand32: (counter: bigint, key: bigint) => number,
    rand64: (counter: bigint, key: bigint) => bigint,
};

const WASM = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 2, 126, 126, 1, 127, 96, 2, 126, 126, 1, 126, 3, 3, 2, 0, 1, 4, 5, 1, 112, 1, 1, 1, 5, 3, 1, 0, 16, 6, 25, 3, 127, 1, 65, 128, 128, 192, 0, 11, 127, 0, 65, 128, 128, 192, 0, 11, 127, 0, 65, 128, 128, 192, 0, 11, 7, 55, 5, 6, 109, 101, 109, 111, 114, 121, 2, 0, 6, 114, 97, 110, 100, 51, 50, 0, 0, 6, 114, 97, 110, 100, 54, 52, 0, 1, 10, 95, 95, 100, 97, 116, 97, 95, 101, 110, 100, 3, 1, 11, 95, 95, 104, 101, 97, 112, 95, 98, 97, 115, 101, 3, 2, 10, 136, 1, 2, 59, 1, 1, 126, 32, 1, 32, 0, 126, 34, 0, 66, 1, 124, 32, 0, 126, 66, 32, 137, 34, 2, 32, 2, 126, 32, 0, 32, 1, 124, 34, 1, 124, 66, 32, 137, 34, 2, 32, 2, 126, 32, 0, 124, 66, 32, 137, 34, 0, 32, 0, 126, 32, 1, 124, 66, 32, 136, 167, 11, 74, 1, 1, 126, 32, 1, 32, 0, 126, 34, 0, 66, 1, 124, 32, 0, 126, 66, 32, 137, 34, 2, 32, 2, 126, 32, 0, 32, 1, 124, 34, 1, 124, 66, 32, 137, 34, 2, 32, 2, 126, 32, 0, 124, 66, 32, 137, 34, 2, 32, 2, 126, 32, 1, 124, 34, 1, 66, 32, 137, 34, 2, 32, 2, 126, 32, 0, 124, 66, 32, 136, 32, 1, 133, 11, 0, 63, 4, 110, 97, 109, 101, 0, 17, 16, 115, 113, 117, 97, 114, 101, 115, 95, 114, 110, 100, 46, 119, 97, 115, 109, 1, 17, 2, 0, 6, 114, 97, 110, 100, 51, 50, 1, 6, 114, 97, 110, 100, 54, 52, 7, 18, 1, 0, 15, 95, 95, 115, 116, 97, 99, 107, 95, 112, 111, 105, 110, 116, 101, 114, 0, 77, 9, 112, 114, 111, 100, 117, 99, 101, 114, 115, 2, 8, 108, 97, 110, 103, 117, 97, 103, 101, 1, 4, 82, 117, 115, 116, 0, 12, 112, 114, 111, 99, 101, 115, 115, 101, 100, 45, 98, 121, 1, 5, 114, 117, 115, 116, 99, 29, 49, 46, 56, 50, 46, 48, 32, 40, 102, 54, 101, 53, 49, 49, 101, 101, 99, 32, 50, 48, 50, 52, 45, 49, 48, 45, 49, 53, 41, 0, 73, 15, 116, 97, 114, 103, 101, 116, 95, 102, 101, 97, 116, 117, 114, 101, 115, 4, 43, 10, 109, 117, 108, 116, 105, 118, 97, 108, 117, 101, 43, 15, 109, 117, 116, 97, 98, 108, 101, 45, 103, 108, 111, 98, 97, 108, 115, 43, 15, 114, 101, 102, 101, 114, 101, 110, 99, 101, 45, 116, 121, 112, 101, 115, 43, 8, 115, 105, 103, 110, 45, 101, 120, 116]);
const WASM_MODULE = await WebAssembly.instantiate(WASM);
const WASM_INTERFACE = WASM_MODULE.instance.exports as WasmInterface;

/** Default key to use as source for random */
export const KEY: bigint = 0x5d8491e219f6537dn;

/**
 * Generates random `u32`
 *
 * @param {bigint} counter - Integer counter which acts as state. Should be increased to generate new number.
 * @param {bigint} key - Integer which in general should be irregular bit pattern with approximately equal number of zeros and ones. Generally should be constant, but can be changed when new range of random numbers is required.
 * @return {number} Random unsigned integer
 */
export function rand32(counter: bigint, key: bigint): number {
    return WASM_INTERFACE.rand32(counter, key) >>> 0;
}

/**
 * Generates random `u64`
 *
 * @param {bigint} counter - Integer counter which acts as state. Should be increased to generate new number.
 * @param {bigint} key - Integer which in general should be irregular bit pattern with approximately equal number of zeros and ones. Generally should be constant, but can be changed when new range of random numbers is required.
 * @return {bigint} Random unsigned integer
 */
export function rand64(counter: bigint, key: bigint): bigint {
    return BigInt.asUintN(64, WASM_INTERFACE.rand64(counter, key))
}
