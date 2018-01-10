import THREE from "../../../../../../node_modules/three/three.min.js"
import RequestAnimationFrame from "../../../../browser/RequestAnimationFrame"
import Map from "./MineCraft/Map"
import Controls from "./Controls"

function Bukkit3DMap(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight , 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Map
    var map = new Map(scene);
    map.setBlock([0,0,0],1,0);
    map.setBlock([0,1,0],1,2);
    map.setBlock([0,3,0],2,0);

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


    var controls;
    function registerControls(domElement){
        //var cubeGeometry = new THREE.CubeGeometry(1,1,1);
        //var cubeMaterial = new THREE.MeshLambertMaterial(
        //    {color: "#ff00ff"});
        //var fakeCamera = new THREE.Mesh(cubeGeometry, cubeMaterial);
        //fakeCamera.position.set(3,3,3);
        //fakeCamera.name = "FAKECAMERA";
        //scene.add(fakeCamera);

        controls = new THREE.OrbitControls(camera,domElement);
        controls.minDistance = 3;
        controls.maxDistance = 40;
        controls.target = map.center;
        controls.enablePan = false;

        //var controls = new Controls(domElement,mapContainer,fakeCamera)
    }
    function doATest(){
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setBaseUrl( 'models/chest/' );
        mtlLoader.setPath( 'models/chest/' );
        mtlLoader.load( 'chest.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( 'models/chest/' );
            objLoader.load( 'chest.obj', function ( object ) {
                object.position.set(3,3,3);
                scene.add( object );
                object.scale.set(0.1,0.1,0.1)
            } );
        });

    }
    doATest();

    this.startRendering = startRendering;
    this.stopRendering = stopRendering;
    this.canvasElement = renderer.domElement;
    this.registerCameraControl = registerControls;
}

export default Bukkit3DMap