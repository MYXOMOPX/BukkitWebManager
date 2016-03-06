AddressConfig.$inject = ["BukkitConnectProvider"];
function AddressConfig(BukkitConnectProvider){
    BukkitConnectProvider.address = "ws://localhost:1313";
}

export default AddressConfig