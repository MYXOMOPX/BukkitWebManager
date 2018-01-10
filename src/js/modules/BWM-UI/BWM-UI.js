import angular from "../../browser/angular"
import angularUiRouter from "../../../../node_modules/angular-ui-router/release/angular-ui-router.min"
import angularCookies  from "../../browser/angular-cookies"

import BukkitAPI from "../BukkitAPI/BukkitAPI"
import StateConfig from "./state/StateConfig"
import AddressConfig from "./AddressConfig/AddressConfig"
import ServicesConfig from "./Services/ServicesConfig"
import BukkitMapDirective from "./BukkitMapDirective/BukkitMap.directive"
import THREE from "../../../../node_modules/three/three.min"
import "../../utils/THREEJS/THREELibraries"

export default angular.module("BWM-UI",[BukkitAPI,angularUiRouter,angularCookies])
    .config(StateConfig)
    .config(AddressConfig)
    .config(ServicesConfig)
    .directive("bukkitMap",BukkitMapDirective)
    .name
;
