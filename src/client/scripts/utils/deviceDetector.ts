import DeviceDetector from "node-device-detector";
import DeviceHelper from "node-device-detector/helper";

const detector = new DeviceDetector();
const userAgent = navigator.userAgent;

export const result = detector.detect(userAgent);

export function isMobile() {
    return DeviceHelper.isMobile(result);
}

export function isDesktop() {
    return DeviceHelper.isDesktop(result);
}