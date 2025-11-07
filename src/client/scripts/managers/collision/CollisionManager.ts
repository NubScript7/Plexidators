import * as THREE from "three"
import { MeshBVH, StaticGeometryGenerator } from "three-mesh-bvh";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";

class CollisionManager {
    staticMeshes: THREE.Mesh[] = [];
    scene?: THREE.Scene

    visualGeometries: THREE.BufferGeometry[] = [];
    environment: THREE.Group = new THREE.Group();

    init(scene: THREE.Scene, map: THREE.Group) {
        this.scene = scene;
        map.traverse((object) => {
            if(object instanceof THREE.Mesh) {
                this.staticMeshes.push(object);
            }
        })

        this.extractGeometries();
    }

    extractGeometries() {
        this.staticMeshes.forEach(mesh => {
            const geom = mesh.geometry.clone();

            geom.applyMatrix4(mesh.matrixWorld);
            this.visualGeometries.push(geom);
        });

        this.mergeGeometries();
    }

    mergeGeometries() {
        const colliderGeometry = BufferGeometryUtils.mergeGeometries(this.visualGeometries);
        const colliderMesh = new THREE.Mesh( colliderGeometry ); 

        this.environment.add( colliderMesh );

        this.generateStatic();
    }

    generateStatic() {
        const staticGenerator = new StaticGeometryGenerator(this.environment);
        staticGenerator.attributes = ['position'];

        const mergedGeometry = staticGenerator.generate();
        mergedGeometry.boundsTree = new MeshBVH(mergedGeometry);

        this.showColliderMesh(mergedGeometry);
    }

    showColliderMesh(mergedGeo: THREE.BufferGeometry) {
        const collider = new THREE.Mesh( mergedGeo, 
            new THREE.MeshBasicMaterial({ wireframe: true, opacity: .1, transparent: true })
        );
        collider.scale.setScalar(8);
        this.scene?.add(collider);
    }
}

export type CollisionManagerType = InstanceType<typeof CollisionManager>;

export const collisionManager = new CollisionManager();