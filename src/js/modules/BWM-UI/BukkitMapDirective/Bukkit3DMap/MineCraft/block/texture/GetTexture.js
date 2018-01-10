import THREE from "../../../../../../../../../node_modules/three/three.min.js";

var texturePackUrl = "textures/defaultHD";
const textureExtension = "png";
const blockTexturesPath = "/assets/minecraft/textures/blocks";
var textureLoader = new THREE.TextureLoader();

export default function GetTexture(name){
    var url = texturePackUrl+blockTexturesPath+`/${name}.${textureExtension}`;
    return textureLoader.load(url);
}