import THREE from "../../../../../../../../node_modules/three/three.min.js";
import Block from "./Block"
import {blocksInfo} from "./BlockConfig";

/**
 * Создает новый блок с указанными ID и Data
 * @param id {Number}
 * @param data {Number}
 * @constructor
 */

export default function CubeBlock(id, data){ /// MORE DATA COMMING
    var infoForTexture = {
        data:data
    };
    var cubeMaterial = blocksInfo[id].texture.get(infoForTexture);


    var THREEModel = new THREE.Mesh(
        new THREE.CubeGeometry(1,1,1),
        cubeMaterial);
    THREEModel.name = `MINECRAFT-BLOCK(${id}:${data})`;

    this.__proto__ = new Block(THREEModel);
    window.block = this;
}