import GetTexture from "./GetTexture"
import THREE from "../../../../../../../../../node_modules/three/three.min.js";

/**
 * Объект содержащий функции, что вовзращают текстуры. Некоторые могут отсутстовать.
 * Если есть только side, блок имеет лишь 1 текстуру (камень, шерсть)
 * Если есть face, то все остальные тоже присутствуют (печь, диспнер)
 * Если есть top/bottom, то есть side и, возможно, противоположная текстура.
 *      Если противоположной нет - используется side
 *
 * Функция должна принимать info и вовзращать Material (THREE-JS)
 * color (опционален) нужен для окраски текстуры (к примеру у травы и листьев)
 * В info будет содержаться: BlockData, Map
 * BlockData
 *
 * @property get {Function} Вовзращает Material, который можно наложить на куб.
 * @constructor
 */
export function CubeBlockMaterial(){
    this.get = null;
}

function getTextureMaterial(texture,color){
    var materialInfo = {
        color: color || 0xffffff,
        map: texture
    };
    return new THREE.MeshBasicMaterial(materialInfo);
}

/**
 * Создает блок с одинаковой текстурой на всех сторонах
 * @param textureNames
 */
export function createOneTextureMaterial(textureNames){
    var textures = textureNames.map((link) => GetTexture(link));
    var textureObject = new CubeBlockMaterial();
    textureObject.get = function(info){
        return getTextureMaterial(textures[info.data]);
    };
    return textureObject;
}

/**
 * Создает блок, у которого 3 текстуры: сверху + снизу + по бокам
 * @param imageMaps {Array} - [{side:txName,top:txName,bottom:txName},{...}]
 */
export function createBottomTopTextureMaterial(imageMaps){
    var textureMaps = imageMaps.map((map) => {
        return {
            side:GetTexture(map.side),
            top:GetTexture(map.top),
            bottom:GetTexture(map.bottom)
        };
    });
    var textureObject = new CubeBlockMaterial();
    textureObject.get = function(info){
        var textureMap = textureMaps[info.data];
        var textureMaterials = [
            getTextureMaterial(textureMap.side),
            getTextureMaterial(textureMap.side),
            getTextureMaterial(textureMap.top),
            getTextureMaterial(textureMap.bottom),
            getTextureMaterial(textureMap.side),
            getTextureMaterial(textureMap.side)
        ];
        return new THREE.MeshFaceMaterial(textureMaterials);
    };
    return textureObject;
}

/**
 * Создает блок, у которого 3 текстуры: сверху + снизу + по бокам
 * face - лицевая текстура.
 * face2 - лицевая текстура, если блок повернут наверх/вниз
 * @param imageMap {Object} - [{side:txName,top:txName,bottom:txName,face:txName,face2:txName},{...}]
 */
export function createFaceableTextureMaterial(imageMap){
    var textureMaps = imageMaps.map((map) => {
        return {
            side:GetTexture(map.side),
            top:GetTexture(map.top),
            bottom:GetTexture(map.bottom)
        };
    });
    var textureObject = new CubeBlockMaterial();
    textureObject.get = function(info){
        var textureMap = textureMaps[info.data];
        var textureMaterials = [
            getTextureMaterial(textureMap.side),
            getTextureMaterial(textureMap.side),
            getTextureMaterial(textureMap.top),
            getTextureMaterial(textureMap.bottom),
            getTextureMaterial(textureMap.side),
            getTextureMaterial(textureMap.side)
        ];
        return new THREE.MeshFaceMaterial(textureMaterials);
    };
    return textureObject;
}