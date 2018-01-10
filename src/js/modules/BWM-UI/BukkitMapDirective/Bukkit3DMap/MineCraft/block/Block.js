
export default function Block(THREEModel){
    Object.defineProperty(this,"x",{
        get:function(){return this.position.x},
        set:function(x){this.position.x = x}
    });
    Object.defineProperty(this,"y",{
        get:function(){return this.position.y},
        set:function(y){this.position.y = y}
    });
    Object.defineProperty(this,"z",{
        get:function(){return this.position.z},
        set:function(z){this.position.z = z}
    });
    this.__proto__ = THREEModel;
}