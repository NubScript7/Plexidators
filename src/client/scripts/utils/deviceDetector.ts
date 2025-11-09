import DeviceDetector from "node-device-detector";
import DeviceHelper from "node-device-detector/helper";

const detector = new DeviceDetector();
const userAgent = navigator.userAgent;

export const result = detector.detect(userAgent);

export const deviceTypes = detector.getAvailableDeviceTypes();

export function getDeviceType() {
    return DeviceHelper.getDeviceType(result);
}