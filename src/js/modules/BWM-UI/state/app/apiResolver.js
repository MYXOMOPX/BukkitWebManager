const TOKEN_NAME = "token";
const TOKEN_EXPIRES = 1000*60*60*24*7; // 1 week

ApiResolver.$inject = ["$timeout","$cookies","$state","$q","BukkitConnect"];
function ApiResolver($timeout,$cookies, $state, $q, BukkitConnect){
    var token = $cookies.get(TOKEN_NAME);
    if (!token) {
        console.log("No token!");
        $timeout(() => $state.go("notAuthorized"),0);
        return $q.reject(false);
    }

    return BukkitConnect(token)
        .then(api => {
            console.log("RESOLVED API",api);
            $cookies.put(TOKEN_NAME,token,{expires:new Date(Date.now()+TOKEN_EXPIRES)});
            return api
        })
        .catch(e => {
            console.log("CATCH API",e);
            $cookies.remove(TOKEN_NAME);
            $state.go("noauth");
            return $q.reject(e);
        })
    ;
}


export default ApiResolver