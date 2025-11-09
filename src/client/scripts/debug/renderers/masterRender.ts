import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { debugConfig } from "../../config/debug";
import type { CoreContext } from "../../core/CoreContext";

class MasterRenderer {
    #init: boolean
    camera: THREE.Camera
    renderer: THREE.WebGLRenderer

    scene?: THREE.Scene
    mainRenderer?: THREE.WebGLRenderer

    constructor() {
        this.#init = false;
        
        const aspectRatio = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(70, aspectRatio, 1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        })
    }

    get initialized() {
        return this.#init;
    }
    
    init(core: CoreContext) {
        this.scene = core.scene;
        this.mainRenderer = core.renderer;

        this.#init = true;
    
        
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0xbfc0cd);

        core.scene.add(this.camera);
        
        document.body.appendChild(this.renderer.domElement);
        
        this.initCamera();
        const controller = new OrbitControls(this.camera, this.renderer.domElement);
        controller.update();
        
        core.animateManager.add(() => {
            if(debugConfig.showDebugRenderer) {
                this.renderer.render(core.scene, this.camera);
            }
        })

        this._onWindowResize();
        window.onresize = () => this._onWindowResize();
    }

    _onWindowResize() {
        this.fullScreenMainRenderer(!debugConfig.showDebugRenderer);
    }

    initCamera() {
        this.camera.position.set(0, 2, -5);
        this.camera.lookAt(new THREE.Vector3(0,0,0));
    }

    resize() {
        if(!this.#init) {
            throw new Error("master renderer not yet initialized");
        }

        this.mainRenderer!.setSize(window.innerWidth, window.innerHeight/2);
        this.renderer.setSize(window.innerWidth, window.innerHeight/2);
    }

    fullScreenMainRenderer(enable = true) {
        if(!this.#init) {
            throw new Error("master renderer not yet initialized");
        }

        masterRenderer.renderer.domElement.style.display = enable ? "none" : "block";

        if(enable) {
            this.mainRenderer!.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        } else {
            this.resize();
        }

    }
    
}

export type MasterRendererType = InstanceType<typeof MasterRenderer>;

export const masterRenderer: MasterRendererType = new MasterRenderer();