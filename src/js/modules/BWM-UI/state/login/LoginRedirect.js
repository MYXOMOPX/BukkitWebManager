const TOKEN_NAME = "token";
const TOKEN_EXPIRES = 1000*60*60*24*7; // 1 week
const TOKEN_REGEXP = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/

LoginRedirect.$inject = ["$stateParams","$cookies","$state"];
function LoginRedirect($stateParams,$cookies,$state){
    var token = $stateParams.token;
    if (!token || !token.match(TOKEN_REGEXP)) {
        $cookies.remove(TOKEN_NAME);
        $state.go("notAuthorized");
        return;
    }
    $cookies.put(TOKEN_NAME,token,{expires:new Date(Date.now()+TOKEN_EXPIRES)});
    $state.go("app");
}

export default LoginRedirect;