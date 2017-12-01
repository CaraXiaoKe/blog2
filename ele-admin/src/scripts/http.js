import axios from 'axios'
import { Message } from 'element-ui';
import { Loading } from 'element-ui';

let loadingInstance = null;

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use(function (response) {

    if(loadingInstance&&loadingInstance.visible){
       loadingInstance.close();
    };
    return response.data;

}, function (error) {
    if(loadingInstance&&loadingInstance.visible){
       loadingInstance.close();
    };
    if(error.response.status === 504){
        Message({
            showClose: true,
            message: "服务器异常",
            type: 'error'
        });
    }else{
        Message({
            showClose: true,
            message: error.response.data.msg||error.response.data.errmsg,
            type: 'error'
        });
    }
    if(error.response.status==401){
        location.href = "/login";
    };
    return Promise.reject(error);

});

const install = function(Vue){
    Vue.axios = Vue.prototype.$axios = function(op={}){
        if(op.L){
           loadingInstance = Loading.service();
        };
        axios.defaults.headers.common['Authorization'] = store.get('token');
        return axios;
    };
}
export default {
    install
}
