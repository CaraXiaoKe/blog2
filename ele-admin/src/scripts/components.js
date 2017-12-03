import {
    Container,
    Aside,
    Header,
    Main,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    RadioGroup,
    RadioButton,
    Button,
    Tooltip,
    Form,
    FormItem,
    Input,
    Col,
    Select,
    Option,
    Tag,
    Upload,
    Table,
    TableColumn,
    Pagination,
    Row,
    Notification,
    Message
} from 'element-ui'
const components = [
    Container,
    Aside,
    Header,
    Main,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    RadioGroup,
    RadioButton,
    Button,
    Tooltip,
    Form,
    FormItem,
    Input,
    Col,
    Select,
    Option,
    Tag,
    Upload,
    Table,
    TableColumn,
    Pagination,
    Row
];
const install = function(Vue,opts={}){
    if(install.installed) return;
    components.map(component => {
        Vue.component(component.name, component);
    });
    const ELEMENT = {};
    ELEMENT.size = opts.size || '';
    Vue.prototype.$ELEMENT = ELEMENT;
    Vue.prototype.$message = Message;
    Vue.prototype.$notify  = Notification;
}

export default {
    install
}
