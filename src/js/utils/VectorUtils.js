import THREE from "../../../node_modules/three/three.min"

/**
 * Превращает угол Эйлера в 3D вектор
 * @param eulerAngle {THREE.Euler}
 * @returns {THREE.Vector3}
 */
export function eulerToVector(eulerAngle){
    var x = Math.sin(eulerAngle.y);
    var y = Math.sin(eulerAngle.x)*Math.cos(eulerAngle.y);
    var z = -Math.cos(eulerAngle.x)*Math.cos(eulerAngle.y);
    return new THREE.Vector3(x,y,z);
}