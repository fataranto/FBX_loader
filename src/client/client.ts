import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene()
//scene.add(new THREE.AxesHelper(5)) // uncomment to show axes

/* const light = new THREE.PointLight()
light.position.set(0.8, 1.4, 1.0)
scene.add(light) */

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(3.5, 3.5, 3.5)

const renderer = new THREE.WebGLRenderer()

//define main (suka) colors
const primary = 0x33BDC7;
const shadeLight = 0xAFE4E7;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(shadeLight, 1); // light blue background


renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// controls allow the camera to orbit around a target
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 1, 0) 

//const material = new THREE.MeshNormalMaterial()

const fbxLoader = new FBXLoader()
fbxLoader.load(
    'models/Simple3D_VR_highpoly_matVray.fbx',
    (object) => {
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         // (child as THREE.Mesh).material = material
        //         if ((child as THREE.Mesh).material) {
        //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
        //         }
        //     }
        // })
        // object.scale.set(.01, .01, .01)
        scene.add(object)
    },
    (xhr) => {

        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

/* const stats = Stats()
document.body.appendChild(stats.dom) */

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

   // stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()

//automatically rotate the model
 setInterval(() => {
     scene.rotation.y += 0.001
 }, 10)

