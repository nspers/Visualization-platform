<template>
    <span class="number" >{{startVal}}</span>
</template>
<script>
export default {
  name: "App",
  props:["value"],
  data() {
    return {
      startVal:0
    };
  },
  watch:{
    value(val){
        this.init(val)
    }
  },
  async created() {
    this.init(this.value)
  },
  methods:{
      init(num){
        let self = this
        let time = Math.abs(num - this.startVal) > 100 ? 10 : 20
        let t = setInterval(function(){
            if(num > self.startVal){
                self.startVal = parseInt(self.startVal)
                self.startVal += parseInt(num / 100) ? parseInt(num / 100) : 1
                if(self.startVal >= num){
                    clearInterval(t)
                    self.startVal = num
                    t = null
                    return false
                }
            }else{
                self.startVal = parseInt(self.startVal)
                self.startVal -= parseInt(num / 10) ? parseInt(num / 10) : 1
                if(self.startVal <= num){
                    clearInterval(t)
                    self.startVal = num
                    t = null
                    return false
                }
            }
        },time)
      }
  }
};
</script>
<style scoped>
.number{display: inline;}
</style>