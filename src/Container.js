import * as THREE from 'three';

export default class Container {
    constructor (width, height, camera = null, scene = null) {
        this.width = width;
        this.height = height;

        this.camera = camera == null ? new THREE.Scene() : camera;
        this.scene = scene == null ? new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 ) : scene;
    }
}