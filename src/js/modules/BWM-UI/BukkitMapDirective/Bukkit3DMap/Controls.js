import RequestAnimationFrame from "../../../../browser/RequestAnimationFrame"
import THREE from "../../../../../../node_modules/three/three.min.js"

const keys = {
    87:"UP",
    83:"DOWN",
    68:"RIGHT",
    65:"LEFT"
};

/**
 * Создает объект для управления Bukkit-картой.
 * WASD - поворт, колесо мыши - приближение.
 * @param domElement {HTMLElement}
 * @param mapMesh {THREE.Object3D}
 * @returns {*}
 */

function Controls(domElement,mapMesh,camera){
    var radius = 10;
    var disabled = false;
    var rotationSpeed = Math.PI/1000; // move per. second
    var cameraMesh = new THREE.Object3D();
    cameraMesh.position.set(0,0,0); // MIDDLE OF MAP
    camera.position.set(0,0,0);
    camera.position.x += radius;
    mapMesh.add(cameraMesh);
    cameraMesh.add(camera);

    var pressedKeys = {};
    function keyDown(event){
        var keyCode = event.keyCode;
        if (!keys[keyCode]) return;
        var kChar = keys[keyCode][0];
        if (pressedKeys[kChar]) return;
        pressedKeys[kChar] = Date.now();
    }

    function keyUp(event){
        var keyCode = event.keyCode;
        if (!keys[keyCode]) return;
        var kChar = keys[keyCode][0];
        delete pressedKeys[kChar]
    }

    function rotateObject(object,axis,degrees){
        var matrix = new THREE.Matrix4();
        var radians = degrees/180*Math.PI;
        matrix.makeRotationAxis(axis.normalize(),radians);
        matrix.multiply(object.matrix);
        object.matrix = matrix;
        object.rotation.setFromRotationMatrix(object.matrix);
    }

    var heightOffset = 0;
    var posX = camera.position.x;
    var posZ = camera.position.z;
    function moveCamera(){
        if (disabled) return;
        RequestAnimationFrame(moveCamera);

        var heightOffsetModifier = getHeightOffsetModifier();
        if (Math.abs(heightOffsetModifier+heightOffset) > radius) return;
        heightOffset += heightOffsetModifier;
        var distance = radius-Math.abs(heightOffset)/radius*(radius-0.0001);
        //camera.position.y = mapMesh.position.y + heightOffset;
        var angle = getRotation();

        var x = posX;
        var z = posZ;

        posX = x * Math.cos(angle) + z * Math.sin(angle);
        posZ = z * Math.cos(angle) - x * Math.sin(angle);
        var newCameraPos = new THREE.Vector3(posX,0,posZ).multiplyScalar(distance/radius);
        camera.position.set(newCameraPos.x,heightOffset,newCameraPos.z);
        camera.lookAt(cameraMesh.position);
        //if (!axis) return;
        //rotateObject(mapMesh,axis,rotationSpeed);
    }

    function getRotation(){
        var angle = 0;
        for (var kChar in pressedKeys) {
            var time = pressedKeys[kChar];
            if (kChar == "R") angle += (Date.now()-time)*rotationSpeed;
            if (kChar == "L") angle -= (Date.now()-time)*rotationSpeed;
            if (kChar == "L" || kChar == "R") pressedKeys[kChar] = Date.now();
        }
        return angle;
    }

    function getHeightOffsetModifier(){
        var heightOffset = 0;
        for (var kChar in pressedKeys) {
            var time = pressedKeys[kChar];
            if (kChar == "U") heightOffset += (Date.now()-time)*rotationSpeed;
            if (kChar == "D") heightOffset -= (Date.now()-time)*rotationSpeed;
            if (kChar == "U" || kChar == "D") pressedKeys[kChar] = Date.now();
        }
        return heightOffset;
    }

    domElement.addEventListener("keydown",keyDown);
    domElement.addEventListener("keyup",keyUp);
    RequestAnimationFrame(moveCamera);


    return {

    }
}


export default Controls;