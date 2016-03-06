const SERVICE_API = Symbol("SERVICE_API");
class TestService{
    constructor(ServiceAPI){
        this[SERVICE_API] = ServiceAPI;
    }

    test(){
        return this[SERVICE_API].sendPacket({action:"DO_SOMETHING",msg:10})
            .then(packet => packet.data)
    }
}
TestService.$inject = ["ServiceAPI"];
export default TestService;