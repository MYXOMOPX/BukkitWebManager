import {blocksInfo} from "./BlockConfig";
import OneTextureBlock from "./CubeBlock";

export default function CreateBlock(id,data){
    var type = blocksInfo[id]["blockType"];
    if (type == "CubeBlock") {
        return new OneTextureBlock(id,data);
    }

    return null;
}