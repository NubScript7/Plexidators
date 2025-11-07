export const INT16_MIN = -32768;
export const INT16_MAX = 32767;

export function mapFloatToInt16(val: number, min: number, max: number) {
    const t = (val - min) / (max - min);;

    return Math.round(t * (INT16_MAX - INT16_MIN) + INT16_MIN);
}

export function mapInt16ToFloat(val: number, min: number, max: number) {
    const t = (val - INT16_MIN) / (INT16_MAX - INT16_MIN);

    return t * (max - min) + min;
}