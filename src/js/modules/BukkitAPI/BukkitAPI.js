import angular from "../../browser/angular"
import BukkitConnectProvider from "./BukkitConnect/BukkitConnectProvider"
export default angular.module("BukkitAPI",[])
    .provider("BukkitConnect",BukkitConnectProvider)
    .name
;
