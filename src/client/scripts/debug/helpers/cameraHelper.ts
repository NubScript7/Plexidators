import * as THREE from "three"

export function toggleCameraHelper(scene: THREE.Scene, enable: boolean) {

    scene.getObjectsByProperty("isCamera", true).forEach((object) => {
        if(object && object instanceof THREE.Camera) {
            const helper = object.userData.cameraHelper;
            
            if(enable) {

                if(helper && helper instanceof THREE.CameraHelper) {
                    helper.visible = true;
                } else {
                    const newHelper = new THREE.CameraHelper(object);
    
                    scene.add(newHelper)
                    newHelper.update()
        
                    object.userData.cameraHelper = newHelper;
                }

            } else {

                if(helper && helper instanceof THREE.CameraHelper) {
                    helper.visible = false;
                }
                
            }
        }
    })
}