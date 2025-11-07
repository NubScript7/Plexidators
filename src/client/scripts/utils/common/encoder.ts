

export function int16arrayEncoder(...params: number[]) {
    const array = new Int16Array(params.length);
    for(const [i, param] of params.entries()) {
        array[i] = param;
    }

    return array;
}

