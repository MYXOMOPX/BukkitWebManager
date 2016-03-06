import TestService from "./PlayerManager/TestService"

ServicesConfig.$inject = ["BukkitConnectProvider"];
function ServicesConfig(BukkitConnectProvider){
    BukkitConnectProvider.service("testService",TestService)
}

export default ServicesConfig