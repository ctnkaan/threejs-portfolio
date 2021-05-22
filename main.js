import './style.css'

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);


//Circle Object

const skintorus = new THREE.TextureLoader().load("earth.jpg");

const geometry = new THREE.SphereGeometry(10,30);
//const material = new THREE.MeshStandardMaterial({ color: 0xEE9B14});
const torus = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: skintorus }));

scene.add(torus);


//Light

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);

//const controls = new OrbitControls(camera, renderer.domElement);

scene.add(pointLight, ambientLight);



//Functions

function animate() {
    requestAnimationFrame(animate);

    //torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    //torus.rotation.z += 0.01;

    moon.rotation.x += 0.005;

    renderer.render(scene,camera);
}

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
  
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
    star.position.set(x, y, z);
    scene.add(star);
}


//Background
Array(300).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;




//Kaan
const kaanTexture = new THREE.TextureLoader().load('kaan.jpg');

const kaan = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: kaanTexture }));

scene.add(kaan);


//Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

kaan.position.z = -5;
kaan.position.x = 2;

// Scroll Animation

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;
  
    kaan.rotation.y += 0.01;
    kaan.rotation.z += 0.01;
  
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
  }
  
document.body.onscroll = moveCamera;
moveCamera();


animate();