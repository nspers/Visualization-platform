<template>
  <div class="checkedBox">
    <span
      :class="{'checked':this.$store.state.checkedArray[this.target],'check':!this.$store.state.checkedArray[this.target]}"
      @click="clickChecked"
    ></span>
  </div>
</template>

<script>
export default {
  props: ["target"],
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.$store.state.checkedArray[this.target] = false;
    });
  },
  methods: {
    clickChecked() {
      if (this.target != "all") {
        this.$store.state.checkedArray[this.target] = !this.$store.state
          .checkedArray[this.target];
        if (!this.$store.state.checkedArray[this.target]) {
          this.$store.state.checkedArray["all"] = false;
        }
        let flag = true;
        for (const key in this.$store.state.checkedArray) {
          if (key != "all" && !this.$store.state.checkedArray[key]) {
            flag = false;
          }
        }
        if (flag) {
          this.$store.state.checkedArray["all"] = true;
        }
      } else {
        // console.log(this.$store.state.checkedArray);
        this.$store.state.checkedArray["all"] = !this.$store.state.checkedArray[
          "all"
        ];
        for (const key in this.$store.state.checkedArray) {
          this.$store.state.checkedArray[key] = this.$store.state.checkedArray[
            "all"
          ];
        }
      }
      this.$set(this.$store.state.checkedArray, 0, "blank");
      delete this.$store.state.checkedArray[0];
      this.$emit("clickChecked");
    }
  }
};
</script>

<style lang="scss" scoped>
.checkedBox {
  display: inline-block;
  .checked {
    display: inline-block;
    cursor: pointer;
    margin-top: 0.03rem;
    width: 0.16rem;
    height: 0.16rem;
    background: url("../assets/img/control/checked.png") no-repeat center/cover;
    background-size: 100%;
  }
  .check {
    display: inline-block;
    cursor: pointer;
    margin-top: 0.03rem;
    width: 0.16rem;
    height: 0.16rem;
    background: url("../assets/img/control/check-1.png") no-repeat center/cover;
    background-size: 100%;
  }
}
</style>