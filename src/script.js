import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { PointLight } from 'three'

// Debug
const gui = new dat.GUI()

// Load Textures
const textureLoader = new THREE.TextureLoader();

// <--- Normal Mapping from gray scale: https://cpetry.github.io/NormalMap-Online/ -->
const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// <---- Object Stuff ----->

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.2;
material.roughness = 0.7;
material.normalMap = normalTexture;

material.color = new THREE.Color(0x00000)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// <---- End Object Stuff ----->


// <---- Lights Stuff ---->

// LIGHT 1
const light1 = gui.addFolder('Light 1');
const pointLight = new THREE.PointLight(0xe1ff, 2)
pointLight.position.set(2.8, -3, -2)
pointLight.intensity = 8.8
scene.add(pointLight)
light1.add(pointLight.position, 'x').min(-6).max(6).step(0.01)
light1.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight, 'intensity').min(0).max(10).step(0.1)

// const pointLightHelper1 = new THREE.PointLightHelper(pointLight, 1)
// scene.add(pointLightHelper1)

// <---------------- Example Light ------------------>
// LIGHT 2

// Create light folder
const light2 = gui.addFolder("Light 2")

// PointLight(color, color intensity)
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-6, 3, 0-1.1)

// Light intensity
pointLight2.intensity = 9.9
scene.add(pointLight2)

// GUI
// you can add clamps and step increment for sliders
light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.1)

// color property
const light2color = {
    color: 0xf0000
}

// GUI change colours
light2.addColor(light2color, 'color').onChange(
    () => {
        pointLight2.color.set(light2color.color)
    }
)

// creates helper to show where light is
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper2)

// <---------------- End of Example ------------------>

// LIGHT 3
const light3 = gui.addFolder('Light 3');
const pointLight3 = new THREE.PointLight(0xffffff, 0.1)
pointLight3.position.set(0.27, 0.34, -.13)
pointLight3.intensity = 0.9
scene.add(pointLight3)
light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light3.add(pointLight3, 'intensity').min(0).max(10).step(0.1)
// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

// <----- Move sphere ----->
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY) 
}

// < ------- Parallax Effect ----->
const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
} 
window.addEventListener('scroll', updateSphere)

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)



    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()