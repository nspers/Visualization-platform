import Vue from 'vue'
import {Button,Loading,Message,Slider,Dialog,DatePicker,Pagination,Timeline,TimelineItem,Select,Option,Input,RadioGroup,Radio,Notification,MessageBox,Switch} from 'element-ui'
const element = {
    install: function (Vue) {
        Vue.use(Button);
        Vue.use(Loading);
        Vue.component(Message);
        Vue.use(DatePicker);
        Vue.use(Slider);
        Vue.use(Pagination);
        Vue.use(Timeline);
        Vue.use(TimelineItem);
        Vue.use(Select);
        Vue.use(Option);
        Vue.use(Input);
        Vue.use(RadioGroup);
        Vue.use(Radio);
        Vue.use(Dialog);
        Vue.use(Switch);
    }
  }
  Vue.prototype.$Message = Message
  Vue.prototype.$notify = Notification
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$confirm = MessageBox.confirm


  export default element
