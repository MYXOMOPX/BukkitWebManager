import app from "./app/app.state"
import map from "./app.map/app.map.state"
import notAuth from "./notAuthorized/notAuthorized.state.js"
import login from "./login/login.state.js"

StateConfig.$inject = ["$stateProvider","$urlRouterProvider"];
function StateConfig($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state(app)
        .state(notAuth)
        .state(login)
        .state(map)
}
export default StateConfig