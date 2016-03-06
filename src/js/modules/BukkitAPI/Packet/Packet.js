import {generateUUID} from "../../../utils/UUID"

/**
 * Функция позволяет созать пакет на основе объекта.
 * В пакете кроме данных из data будут содержаться еще channelId и serviceName
 * @param data {Object} информация пакета.
 * @param serviceName {String} название обработчика, которому направлен пакет
 * @returns {*}
 * @constructor
 */
function Packet(data,serviceName) {
    var packetData = this.data = {};
    for (var field in data) {
        if (data.hasOwnProperty(field)){
            packetData[field] = data[field];
        }
    }
    this.channelId = generateUUID();
    this.service = serviceName;
    this.toString = () => JSON.stringify(this);
}

export default Packet;