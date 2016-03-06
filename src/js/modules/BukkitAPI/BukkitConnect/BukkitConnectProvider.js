import ServiceAPIManager from "../PacketAPIManager/ServiceAPIManager"

BukkitConnectProvider.$inject = [];
/**
 * @name BukkitConnectProvider
 * @returns {{$get: BukkitConnect, service: service, address: string}}
 * @constructor
 */
function BukkitConnectProvider(){

    var services = Object.create(null);
    var ServiceAPI;

    BukkitConnect.$inject = ["$q","$injector"];
    /**
     * @name BukkitConnect
     * @param $q
     * @param $injector
     * @returns {Function}
     */
    function BukkitConnect($q, $injector){
        return function(token){
            var websocket = new WebSocket(provider.address);
            websocket.onopen = function(){
                websocket.send(JSON.stringify({
                    token:token
                }));
            };
            return new $q((resolve,reject) => {
                websocket.onerror = function(event){
                    reject(event)
                };
                websocket.onmessage = function(event){
                    ServiceAPI = $injector.instantiate(ServiceAPIManager,{"websocket":websocket}).ServiceAPI;
                    var data = JSON.parse(event.data);
                    if (data["status"]) {
                        console.log("AUTH ERROR"); // ToDo Ошибка авторизации
                        reject(event.data);
                        return;
                    }
                    var HighLevelAPI = Object.create(null);
                    HighLevelAPI.client = data.client;
                    for (var name in data["services"]){
                        let serviceInfo = data["services"][name];
                        var resolver = buildService(name,serviceInfo,$injector);
                        if (resolver) HighLevelAPI[name] = resolver;
                    }
                    $q.all(HighLevelAPI).then(resolve);
                };
            });
        }
    }

    function buildService(name,serviceInfo,$injector){
        var builder = services[name];
        if (!builder) return null;
        var serviceAPI = new ServiceAPI(name,serviceInfo);
        return $injector.instantiate(builder,{ServiceAPI:serviceAPI});
    }

    /**
     * Добавляет сервис
     * @name BukkitConnectProvider.service
     * @param name {String}
     * @param builder {Function}
     * @this BukkitConnectProvider
     * @returns {BukkitConnectProvider}
     */
    function service(name,builder){
        if (name in services) throw new Error(`Service ${name} already defined`);
        services[name] = builder;
        return this
    }

    var provider = {
        $get:BukkitConnect,
        service:service,
        address:"ws://localhost:7373"
    };
    return provider;
}

export default BukkitConnectProvider;