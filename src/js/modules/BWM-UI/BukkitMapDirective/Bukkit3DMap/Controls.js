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
    mapMesh.add(cameraMesh);
    camera.position.set(10,0,10)
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

    function moveCamera(){
        if (disabled) return;
        RequestAnimationFrame(moveCamera);

        var euler = getCurrentEulerRotation();
        if (!euler) return;
        //cameraMesh.rotation.x = euler.x;
        //cameraMesh.rotation.y = euler.y;
        //cameraMesh.rotation.z = euler.z;
        cameraMesh.position.applyEuler(euler)
    }

    function getCurrentEulerRotation(){
        var x,y,z;
        x = y = z = 0;
        for (var kChar in pressedKeys) {
            var time = pressedKeys[kChar];
            if (kChar == "R") z += (Date.now()-time)*rotationSpeed;
            if (kChar == "L") z -= (Date.now()-time)*rotationSpeed;
            if (kChar == "U") y += (Date.now()-time)*rotationSpeed;
            if (kChar == "D") y -= (Date.now()-time)*rotationSpeed;
            pressedKeys[kChar] = Date.now();
        }
        if (x == 0 && y == 0 && z == 0) return null;
        return new THREE.Euler(x,y,z);
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