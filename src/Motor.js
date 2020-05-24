import * as THREE from "three";
import {WEBGL} from './WEBGL';
var debug = require('debug')('Motor');

export default class Motor {
    constructor (width, height, containers, stack = [0], rendererSettings = { antialias: true }) {
        this.isStarted = false;
        this.stopAnimation = false;

        this.canvasWidth = width;
        this.canvasHeight = height;
        this.containers = containers;
        this.stack = stack;

        this.rendererSettings = rendererSettings;

        this.renderer = new THREE.WebGLRenderer( rendererSettings );
        this.renderer.setSize( this.canvasHeight, this.canvasWidth );



        this.current = this.current.bind(this);
    }

    domElement () {
        return this.renderer.domElement;
    }

    current () {
        debug( JSON.stringify(this.stack) );

        return this.container(this.stack[-1]);
    }

    container (index) {
        return this.containers[index];
    }

    addToStack (index) {
        if ( index < this.containers.length )
            this.stack.push(index);
        else
            throw Error("Container with index " + index + " has not been found.");
    }

    removeFromStack () {
        if( this.stack.length <= 1 ) {
            throw Error("You reached the end of the stack")
        } else {
            this.stack.pop();
        }
    }

    start () {
        if( this.isStarted == false ) {
            this.isStarted = true;
            debug("Motor.animate() has started!");

            if ( WEBGL.isWebGLAvailable() ) {
                debug("WebGL is Available! Starting Motor!");
                this.animate();
            } else {
                debug("WebGL is not available! Motor will not start!");
            }

            this.animate();
        } else {
            debug("The Motor has already started!");
        }
    }

    stop () {
        if( this.isStarted ) {
            this.isStarted = false;
            debug("Motor was stopped!");
        }
    }

    animate () {
        this.renderer.render( this.current().scene, this.current().camera );

        if( this.isStarted )
            requestAnimationFrame( this.animate() );
    }
}