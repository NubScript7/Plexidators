import * as THREE from "three"
import { MeshBVH, StaticGeometryGenerator } from "three-mesh-bvh";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";
import type { CoreContext } from "../../core/CoreContext";
import type { PlayerController } from "../../controllers/PlayerController";
import type { Player } from "../../components/player/Player";

class CollisionManager {
    staticMeshes: THREE.Mesh[] = [];
    scene?: THREE.Scene

    visualGeometries: THREE.BufferGeometry[] = [];
    environment = new THREE.Group();

    tempMat = new THREE.Matrix4();
    tempSegment = new THREE.Line3();
    tempBox = new THREE.Box3();
    tempVector = new THREE.Vector3();
    tempVector2 = new THREE.Vector3();

    colliderGeometry!: THREE.BufferGeometry;
    colliderMesh!: THREE.Mesh;
    staticGenerator!: StaticGeometryGenerator;
    mergedGeometry!: THREE.BufferGeometry;
    collider!: THREE.Mesh;

    isBodyColliding = false;
    visualizer: any;
    

    init(core: CoreContext, map: THREE.Group) {
        this.scene = core.scene;
        map.traverse((object) => {
            if(object instanceof THREE.Mesh) {
                this.staticMeshes.push(object);
            }
        })

        const player = core.playerManager.player;

        //setting up three-mesh-bvh
        this.extractGeometries();
        this.mergeGeometries();
        this.generateStatic();
        // this.showColliderMesh();

        //applying the collision detection
        
        core.animateManager.add(() => {
            this.setupSpace(player);
            this.createAABB(player);
            this.shapecast(player);
            this.applyCorrection(core.playerManager.controller);
        })
    }

    extractGeometries() {
        this.staticMeshes.forEach(mesh => {
            const geom = mesh.geometry.clone();

            geom.applyMatrix4(mesh.matrixWorld);
            this.visualGeometries.push(geom);
        });
    }

    mergeGeometries() {
        this.colliderGeometry = BufferGeometryUtils.mergeGeometries(this.visualGeometries);
        this.colliderMesh = new THREE.Mesh( this.colliderGeometry ); 

        this.environment.add( this.colliderMesh );
    }

    generateStatic() {
        this.staticGenerator = new StaticGeometryGenerator(this.environment);
        this.staticGenerator.attributes = ['position'];

        this.mergedGeometry = this.staticGenerator.generate();
        this.mergedGeometry.boundsTree = new MeshBVH(this.mergedGeometry);

        this.collider = new THREE.Mesh( this.mergedGeometry );
    }

    showColliderMesh() {
        this.scene?.add(this.collider);
    }

    setupSpace(player: Player) {
        player.body.updateMatrixWorld();

        this.tempBox.makeEmpty();
        this.tempMat.copy(this.collider.matrixWorld).invert();

        this.tempSegment.copy(player.capsuleInfo.segment);
        
        this.tempSegment.start.applyMatrix4( player.body.matrixWorld ).applyMatrix4( this.tempMat );
        this.tempSegment.end.applyMatrix4( player.body.matrixWorld ).applyMatrix4( this.tempMat );
    }

    createAABB(player: Player) {
        
        // get the axis aligned bounding box of the capsule
        this.tempBox.expandByPoint( this.tempSegment.start );
        this.tempBox.expandByPoint( this.tempSegment.end );
        
        this.tempBox.min.addScalar( - player.capsuleInfo.radius );
        this.tempBox.max.addScalar( player.capsuleInfo.radius );
    }

    shapecast(player: Player) {
        this.collider.geometry.boundsTree!.shapecast({ 
            intersectsBounds: box => box.intersectsBox( this.tempBox ), //<-- tempBox is the bounding box containing our player/entity 
            
            intersectsTriangle: tri => { 
                // (*)
                const triPoint = this.tempVector; // re-using vector: this will be filled by closestPointToSegment
                const capsulePoint = new THREE.Vector3();  // re-using vector: this will be filled by closestPointToSegment
                
                // distance = shortest distance between the triangle (tri) and the capsule's central line
                const distance = tri.closestPointToSegment( this.tempSegment, triPoint, capsulePoint );
                if ( distance < player.capsuleInfo.radius ) {
                
                    // depth = how far the capsule has penetrated the triangle?
                    const depth = player.capsuleInfo.radius - distance;
                    
                    // direction = the direction the player needs to be pushed to resolve the collision
                    const direction = capsulePoint.sub( triPoint ).normalize();
                    
                    //
                    // push the player/entity away from the collision point...
                    //
                    this.tempSegment.start.addScaledVector( direction, depth );
                    this.tempSegment.end.addScaledVector( direction, depth );
                }
            }
        });
    }

    applyCorrection(controller: PlayerController) {
        const player = controller.player;
        const newPosition = this.tempVector;
        newPosition.copy( this.tempSegment.start ).applyMatrix4( this.collider.matrixWorld ); // local to world...
        
        // the total displacement from the player's original position to the new, collision-free position.
        const deltaVector = this.tempVector2;
        deltaVector.subVectors( newPosition, player.body.position );
        
        // apply the push... 
        player.body.position.add( deltaVector );
        controller.syncCameraToBody();
    }


}

export type CollisionManagerType = InstanceType<typeof CollisionManager>;

export const collisionManager = new CollisionManager();