import LoginRedirect from "./LoginRedirect"
export default {
    name:"login",
    url:"/login?{token}",
    onEnter:LoginRedirect
}