import { createApp } from 'vue'

import App from './App.vue'
import router from'./router/mainrouter'
import  'bootstrap/dist/css/bootstrap.min.css'
import { Button, message,Input} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import gAuthPlugin from 'vue3-google-oauth2'
import { Modal,Table ,TabPane,Tabs,Tag,Pagination,Popconfirm,Spin,Step,Steps} from 'ant-design-vue';
const app = createApp(App)
app.use(router)
let gauthClientId="228760955421-8mth83j4u7grcg7nfk93uf6c31ccjgbn.apps.googleusercontent.com";
app.use(gAuthPlugin,{
clientId:gauthClientId,
scope:'email',
prompt:'consent',
plugin_name:"Web client2-clientITrequest"
});

app.config.globalProperties.$message = message;
app.use(Button);
app.use(Input);
app.use(Modal)
app.use(Table);
app.use(TabPane);
app.use(Tabs);
app.use(Tag);
app.use(Pagination);
app.use(Popconfirm);
app.use(Spin);
app.use(Step);
app.use(Steps);
app.use(gAuthPlugin);
app.mount('#app');

