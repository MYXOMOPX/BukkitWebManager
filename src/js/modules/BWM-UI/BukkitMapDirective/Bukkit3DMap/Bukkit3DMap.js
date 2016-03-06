import THREE from "../../../../../../node_modules/three/three.min.js"
import RequestAnimationFrame from "../../../../browser/RequestAnimationFrame"
import Controls from "./Controls"

function Bukkit3DMap(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight , 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Map Container
    var mapContainer = new THREE.Object3D();
    mapContainer.position.set(10,10,10);
    scene.add(mapContainer);

    // Add cube
    addBlock(new THREE.Vector3(0,0,0),"#ff0000");
    addBlock(new THREE.Vector3(3,3,3),"#f0f000");
    addBlock(new THREE.Vector3(2,1,3),"#00ff00");

    // Setup camera;
    camera.position.set(40,20,0);
    camera.lookAt(mapContainer.position);

    // Create spotlight
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set(40, 20, 0);
    scene.add(spotLight);


    var rendering = false;
    function renderFrame(){
        if (!rendering) return;
        RequestAnimationFrame(renderFrame);
        renderer.render(scene,camera);
    }
    function startRendering(){
        if (rendering) return;
        rendering = true;
        RequestAnimationFrame(renderFrame)
    }
    function stopRendering(){
        rendering = false;
    }

    /**
     * Вешает на элемент листенеры keydown, mousescroll
     * Изменяет размер/поворот карты;
     * @param domElement {HTMLElement}
     */
    function registerControls(domElement){
        var cubeGeometry = new THREE.CubeGeometry(1,1,1);
        var cubeMaterial = new THREE.MeshLambertMaterial(
            {color: "#ff00ff"});
        var fakeCamera = new THREE.Mesh(cubeGeometry, cubeMaterial);
        fakeCamera.position.set(3,3,3);
        fakeCamera.name = "FAKECAMERA";
        scene.add(fakeCamera);
        var controls = new Controls(domElement,mapContainer,camera)
    }

    function addBlock(vector,color){
        var cubeGeometry = new THREE.CubeGeometry(1,1,1);
        var cubeMaterial = new THREE.MeshLambertMaterial(
            {color: color});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(vector.x,vector.y,vector.z);
        cube.name = "MCBlock";
        mapContainer.add(cube);
        return cube;
    }

    this.startRendering = startRendering;
    this.stopRendering = stopRendering;
    this.canvasElement = renderer.domElement;
    this.registerCameraControl = registerControls;
}

export default Bukkit3DMap