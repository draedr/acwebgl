import * as THREE from 'three';

import Container from './Container';
import Motor from './Motor';

const width = window.innerWidth;
const height = window.innerHeight;

var containers = [
    new Container(width, height)
];
var motor = new Motor( width, width, containers );

motor.start();
document.body.appendChild( motor.domElement() );