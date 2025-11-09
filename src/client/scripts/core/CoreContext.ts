import * as THREE from "three"
import { PlayerManager } from "../managers/core/PlayerManager";
import { AnimateManager } from "../managers/core/AnimateManager";

export class CoreContext {
    
    readonly scene = new THREE.Scene();
    readonly renderer = new THREE.WebGLRenderer({ antialias: true });
    readonly domElement = this.renderer.domElement

    readonly clock = new THREE.Clock();

    readonly animateManager = new AnimateManager();
    readonly playerManager = new PlayerManager(this);

    readonly camera = this.playerManager.player.camera;

    constructor() {
        this.initScene();
        this.initRenderer();
        this.initClock();
        this.initAnimator();
    }

    initScene() {};

    initRenderer() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0xbfc0cd);
        document.body.appendChild(this.renderer.domElement);

        window.onresize = () => this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    initClock() {};

    initAnimator() {
        this.renderer.setAnimationLoop(() => this.animateManager.animate(this.clock.getDelta()));
    }

}