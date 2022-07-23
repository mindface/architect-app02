import * as THREE from "three"
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

type ItemNumbers = {
 level?: number
 doing?: number
 planing?: number
 play?: number
}

function generateSprite(itemMumber:ItemNumbers) {
  const canvas = document.createElement('canvas')     
  canvas.width = 50
  canvas.height = 50
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const gradient = ctx.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
  gradient.addColorStop(0,'rgba(0,2,252,0.1)')
  gradient.addColorStop(0.5,'rgba(87,89,252,0.4)')
  gradient.addColorStop(1,'rgba(0,3,188,0.1)')
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0, canvas.width, canvas.height)
  return canvas
}

class ThreeModle {
  putElement: HTMLCanvasElement

  scene: THREE.Scene = new THREE.Scene
  geometry: THREE.BoxGeometry = new THREE.BoxGeometry
  material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera
  controls: TrackballControls | null = null
  meshList: any = []

  constructor(canvas: HTMLCanvasElement){
   this.putElement = canvas
  }
  Init(itemMumber:ItemNumbers) {
    const parentElement = this.putElement.parentNode as HTMLDivElement

    this.renderer = new THREE.WebGLRenderer({ canvas: this.putElement, antialias:true });
    this.renderer.setPixelRatio(1)
    this.renderer.setSize( parentElement.clientWidth, 800 );
    
    this.camera = new THREE.PerspectiveCamera( 45, parentElement.clientWidth / 800 );
    this.camera.position.set(0,0,30);
    this.camera.lookAt(new THREE.Vector3(0,0,0))
    // this.controls = new THREE.OrbitControls(this.camera, this.putElement)
    this.createControls(this.camera)

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000)

    // this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    const mesh = new Sprites(itemMumber)
    this.scene.add(mesh)
    this.meshList.push(mesh)
    
    this.controls?.update()

    const animate = () => {
     this.controls?.update()
     mesh.update()
     this.renderer.render( this.scene, this.camera );
     requestAnimationFrame( animate );
    };
    animate()
  }


  createControls(camera: THREE.Camera) {
    this.controls = new TrackballControls(camera,this.putElement)
    this.controls.rotateSpeed = 5.0
    this.controls.zoomSpeed = 1.2
    this.controls.panSpeed = 0.8
    this.controls.keys = ['65', '83' ,'68']
  }

}

class Sprites extends THREE.Object3D {
  particleList: THREE.Points[]
  angle: number
  geometry: THREE.BufferGeometry
  material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial
  materials: THREE.PointsMaterial | [] = []
  vertices: number[] = []
  vertex: THREE.Vector3
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer
  particles: THREE.Points = new THREE.Points
  constructor(itemMumber:ItemNumbers){
   super()
   this.particleList = []
   this.angle = 0
   this.geometry = new THREE.BufferGeometry()
   this.vertices = []
   this.vertex = new THREE.Vector3()

   for (let num = 0; num < 100; num++) {
     this.materials = new THREE.PointsMaterial({
       size: Math.random()*0.3,
       map: new THREE.CanvasTexture( generateSprite(itemMumber) ),
       blending: THREE.AdditiveBlending,
       depthTest: false,
       transparent: true,
       fog: true
     })

     this.vertex.set(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() + 1 - 1)

     this.vertex.normalize()
     this.vertex.multiplyScalar(4)
     this.vertices.push( this.vertex.x, this.vertex.y, this.vertex.z )
     this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices, 3))

     this.particles = new THREE.Points( this.geometry, this.materials )
     this.add(this.particles)
     this.particleList.push(this.particles)
     this.particleList[num].rotation.x = num
     this.particleList[num].rotation.z = num

   }
  }

  update() {
   for (let num = 0; num < this.particleList.length; num++) {
    this.particleList[num].rotation.x += 0.001
    this.particleList[num].rotation.z += 0.003
   }
  }

}


export default ThreeModle
