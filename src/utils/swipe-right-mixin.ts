import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SwipeRightMixin extends Vue {
  //  hammer.on(`swipe${swipeEvent}`, listener); => listener === handleSwipeRight
  private async handleSwipeRight(e: HammerInput) {
    console.log(e);
    // deltaX 划过的长度
    // direction 1234 慢上下左右 5678 快上下左右
    const { deltaX, direction } = e;
    if (direction === 4 && Math.abs(deltaX) > 10) {
      this.$router.go(-1);
    }
  }
}
