import template from "./BukkitMap.tpl.html"
import Bukkit3DMap from "./Bukkit3DMap/Bukkit3DMap"
import $ from "../../../browser/jquery"

BukkitMapDirective.$inject = [];
function BukkitMapDirective(){
    function link(scope,element,attrs){
        var api = null; // TodO
        var map = new Bukkit3DMap();


        //attrs.$observe("fullscreen",function(val){
        //   if (val) map.goFullscreen();
        //});

        element.find(".BukkitMap").append(map.canvasElement); // Добавляем канвас в темплейт
        map.startRendering();
        map.registerCameraControl(element.find(".BukkitMap")[0]);
        scope.$on("$destroy", () => { // Что делаем при уничтожении скоупа
            map.stopRendering()
        })
    }
    return {
        link:link,
        template:template
    }
}


export default BukkitMapDirective;