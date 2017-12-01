export default {
    set(key,value){
        if(typeof value === "object"){
            localStorage.setItem(key,JSON.stringify(value));
        }else{
            localStorage.setItem(key,value);
        }
    },
    get(key){
        let value = localStorage.getItem(key);
        try{
           value = JSON.parse(value);
        }catch(err){};
        return value;
    },
    clear(key){
        if(key!==undefined){
            localStorage().removeItem(key)
        }else{
            localStorage().clear()
        }
    }
}
