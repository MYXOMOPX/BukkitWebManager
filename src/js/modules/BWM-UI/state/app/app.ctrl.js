class AppController{
    constructor(api){
        console.log("api",api);
        this.api = api;
    }
    get avatarUrl(){
        return "https://crafatar.com/avatars/"+this.api.client.playerName
    }
    get playerName(){
        return this.api.client.playerName
    }
    get someString(){
        return "MAKE A TEST"
    }
    async sendTest(){
        this.value = await this.api.testService.test()
    }
}
AppController.$inject = ["api"];
export default AppController;