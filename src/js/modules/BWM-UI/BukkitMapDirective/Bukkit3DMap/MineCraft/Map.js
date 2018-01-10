import THREE from "../../../../../../../node_modules/three/three.min.js"
import CreateBlock from "./block/CreateBlock"

function Map(scene){
    var mapContainer = new THREE.Object3D();
    mapContainer.position.set(0,0,0);
    mapContainer.name = "MAP-CONTAINER";
    var blockContainer = new THREE.Object3D();
    blockContainer.position.set(0,0,0);
    blockContainer.name = "BLOCK-CONTAINER";
    mapContainer.add(blockContainer);
    scene.add(mapContainer);

    /**
     * Ставит блок
     * @param position
     * @param id
     * @param data
     */
    function setBlock(position,id,data){
        var x,y,z;
        if (position.x == null) {
            x = position[0];
            y = position[1];
            z = position[2];
        } else {
            x = position.x;
            y = position.y;
            z = position.z;
        }
        var block = CreateBlock(id,data);
        if (!block || !block.position) {
            console.log(`WARNING! Can't create block with id=${id} data=${data}`);
            return;
        }
        block.position.set(x,y,z);
        blockContainer.add(block);
        calculateCenter()
    }

    /**
     * Удаляет блок
     * @param position
     */
    function removeBlock(position){
        var block = blockContainer.children.find(function(block){
            var blockPos = block.position;
            return (blockPos.x == position.x && blockPos.y == position.y && blockPos.z == position.z)
        });
        if (!block) return;
        blockContainer.remove(block);
        calculateCenter();
    }

    var center;
    function calculateCenter(){
        var blocks = blockContainer.children;
        var xs = blocks
            .map(function(b){return b.position.x})
            .sort(function(a,b){return a-b});
        var middleX = (xs[0]+xs[blocks.length])/2;
        var ys = blocks
            .map(function(b){return b.position.y})
            .sort(function(a,b){return a-b});
        var middleY = (ys[0]+ys[blocks.length])/2;
        var zs = blocks
            .map(function(b){return b.position.z})
            .sort(function(a,b){return a-b});
        var middleZ = (zs[0]+zs[blocks.length])/2;
        center = new THREE.Vector3(middleX,middleY,middleZ);
    }

    this.setBlock = setBlock;
    this.removeBlock = removeBlock;
    Object.defineProperty(this,"center",{get:function(){return center}});
}


export default Map