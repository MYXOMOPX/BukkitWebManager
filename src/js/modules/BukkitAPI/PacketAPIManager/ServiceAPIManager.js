import Packet from "../Packet/Packet"

ServiceAPIManager.$inject = ["websocket","$rootScope"];
function ServiceAPIManager(websocket,$rootScope){
    /**
     * При закрытии websocket вызываем все подписавшиеся функции,
     * но вместо пакета передаем им null
     */
    websocket.onclose = function(){
        subscriberMap.forEach((subscriber) => {
            subscriber(null);
        });
        subscriberMap.clear();
    };

    var subscriberMap = new Map();

    /**
     * Глобальный обработчик сообщений от сервера
     */
    websocket.onmessage = onWebSocketMessage;
    function onWebSocketMessage(event){
        var data;
        try {
            data = JSON.parse(event.data);
        } catch (ignored) {
            console.log("WRONG JSON FROM SERVER");
            return;
        }
        var channelId = data["channelId"];
        delete data.channelId;
        var subscriber = subscriberMap.get(channelId);
        if (subscriber) {
            $rootScope.$apply(() => subscriber(data))
        }
    }

    /**
     * Подписывается на получение пакетов по websocket'у.
     * @private
     * @param channelId {Number} нормер канала
     * @param func {Function} кэлбэк, что выполнится при получении сообщения
     */
    function subscribe(channelId,func){
        subscriberMap.set(channelId,func)
    }

    /**
     * Отписаться от прослушивания канала.
     * @private
     * @param channelId {Number} номер канала
     */
    function unsubscribe(channelId){
        subscriberMap.delete(channelId)
    }

    const SERVICE_NAME = Symbol("SERVICE_NAME");
    const SERVICE_INFO = Symbol("SERVICE_INFO");
    class ServiceAPI{

        constructor(serviceName,serviceInfo){
            this[SERVICE_NAME] = serviceName;
            this[SERVICE_INFO] = serviceInfo;
        }

        /**
         * Отправит данные серверу и вернет промис (с будущим ответом от сервера)
         * @async
         * @param data {Object} данные, отсылаемые серверу.
         * @returns {*} промис, который ресолвнет или режектнет то, что прислал сервер.
         */
        sendPacket(data){
            var packet = new Packet(data,this[SERVICE_NAME]);
            websocket.send(packet);
            return new Promise(function(resolve,reject){
                subscribe(packet.channelId,function(data){
                    if (data == null) return reject(data);
                    unsubscribe(packet.channelId);
                    if (data.status) reject(data);
                    else resolve(data);
                })
            });
        }

        /**
         * Отправляет пакет и подписывается на многократное получение ответа от сервера
         * @param data {Object} информация, отправляемая серверу
         * @param func {Function} функция, что исполнится при получении ответа.
         * @returns {Function} функиця, чтобы отписаться.
         */
        listen(data,func) {
            var packet = new Packet(data,this[SERVICE_NAME]);
            websocket.send(packet);
            subscribe(packet.channelId,func);
            return unsubscribe.bind(null,packet.channelId);
        }

        /**
         * Название сервиса
         * @property
         * @readonly
         * @name ServiceAPI#name
         * @type {String}
         */
        get name(){
            return this[SERVICE_NAME];
        }

        /**
         * Информация о сервисе
         * @property
         * @readonly
         * @name ServiceAPI#info
         * @type {*}
         */
        get info(){
            return this[SERVICE_INFO];
        }
    }

    return {
        ServiceAPI:ServiceAPI
    }
}

export default ServiceAPIManager;