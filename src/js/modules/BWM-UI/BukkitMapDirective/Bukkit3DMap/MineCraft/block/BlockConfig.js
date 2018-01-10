import {
    createOneTextureMaterial,
    createBottomTopTextureMaterial
} from "./texture/CubeBlockMaterial";
import THREE from "../../../../../../../../node_modules/three/three.min.js";

var texturePackUrl = "textures/defaultHD";
const textureExtension = "png";
const blockTexturesPath = "/assets/minecraft/textures/blocks";
var textureLoader = new THREE.TextureLoader();

function getTexture(name){
    var url = texturePackUrl+blockTexturesPath+`/${name}.${textureExtension}`;
    return textureLoader.load(url);
}

var loadStoneTextures = function(){
    return createOneTextureMaterial(["stone",
        "stone_granite",
        "stone_granite_smooth",
        "stone_diorite",
        "stone_diorite_smooth",
        "stone_andesite",
        "stone_andesite_smooth"])
};

var loadGrassTextures = function(){
    return createBottomTopTextureMaterial([
        {
            top:"grass_top",
            side:"grass_side",
            bottom:"dirt"
        }
    ]);
};

export var blocksInfo = {
    0:{
        blockType:"NONE",
        material:"air"
    },
    1:{
        blockType:"CubeBlock",
        material:"stone",
        texture:loadStoneTextures()
    },
    2:{
        blockType:"CubeBlock",
        material:"grass",
        texture:loadGrassTextures()
    }

};

