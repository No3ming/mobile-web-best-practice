import Vue from 'vue';

// 混合代替event事件，我也不知道有什么用，应该是为了集中管理吧
export default new Vue({
  methods: {
    on(event: string, callback: (...args: any[]) => void) {
      this.$on(event, callback);
      return this;
    },

    once(event: string, callback: (...args: any[]) => void) {
      this.$once(event, callback);
      return this;
    },

    off(event: string, callback: (...args: any[]) => void) {
      this.$off(event, callback);
      return this;
    },

    emit(event: string, ...args: any[]) {
      this.$emit(event, ...args);
      return this;
    }
  }
});
