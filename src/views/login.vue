<template>
    <div class="login">

        <div class="overvideo">
        <form @submit.prevent="register()" class="clearfix">            
            <p>
                <img src="../assets/img/logo.png" />
            </p>
            <el-input  placeholder="账号"  v-model="id"  clearable></el-input>
            <el-input placeholder="密码" v-model="pd" show-password></el-input>
            <el-button type="primary" :loading="false" @click="register()" >登录</el-button>
        </form>
        </div>
        <video src="../assets/img/login.mp4" autoplay loop muted></video>
    </div>
</template>
<script>
export default {
    name: 'App',
    data(){
        return{
            loading:false,
            id: 'zgk5',
            pd: '123456',
            // captcha:'http://localhost:3000/captcha?',
            // captchaInp:''
        }
    },
    mounted(){
    },
    components:{
    },
    created:function() {
        if(this.$route.params.reload){
            location.reload()
        }
    },
    methods:{
        register(){
            var self = this
            this.$api.post2('/user/login',{username:'zgk5',password:'123456'},{emulateJSON:true,withCredentials:true}).then(function(res){
                if(res.code == 0){
                    // window.sessionStorage.setItem('token','Eels')
                    // this.$router.push({path:'/'})
                }
                self.ws.initWebSocket()
                // self.ws.sendSock('aaa')
            })
            
            
            // let socket = io('http://localhost:80');
            // // socket.emmit()用户客户端向服务端发送消息，服务端与之对应的是socket.on()来接收信息。
            // socket.emmit('client message', {msg:'hi, server'});
            // // socket.on()用于接收服务端发来的消息
            // socket.on('connect',  ()=>{
            //     console.log('client connect server');
            // });
            // socket.on('disconnect', ()=>{
            //     console.log('client disconnect');
            // });
            // sessionStorage.setItem('token','eels')
            // this.$router.push({name:'common',params:{reload:1}})
        }
    }
    }
</script>
