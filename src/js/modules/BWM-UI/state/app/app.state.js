import controller from "./app.ctrl.js"
import template from "./app.tpl.html"
import ApiResolver from "./ApiResolver"
export default {
    name:"app",
    controller:controller,
    template:template,
    controllerAs:"ctrl",
    url:"/",
    resolve:{
        api:ApiResolver
    }
}