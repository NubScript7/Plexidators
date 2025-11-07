
/**
 * @returns A function to cancel the loop.
 */
export function requestInterval(cb: () => void, delay=50) {
    if(delay < 16) delay = 16;

    let start = Date.now();
    let reqId: number;

    const loop = () => {
        const now = Date.now();

        if(now - start >= delay) {
            cb();
            start = now;
        }

        reqId = requestAnimationFrame(loop);
    }

    reqId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(reqId);
}