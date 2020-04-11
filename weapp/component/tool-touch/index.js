
Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    swipeleft: {type: Function, value: ()=>{}},
    swiperight: {type: Function, value: ()=>{}},
  },
  data: {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  },
  methods: {
    /* 开始 */
    touchStart(e){
      let startX = e.changedTouches[0].clientX;
      let startY = e.changedTouches[0].clientY;
      this.setData({ startX: startX, startY: startY });
    },
    /* 结束 */
    touchEnd(e){
      let endX = e.changedTouches[0].clientX;
      let endY = e.changedTouches[0].clientY;
      this.setData({ endX: endX, endY: endY });
      this.triggerEvent('swipe', this.onSwipe());
    },
    /* 判断 */
    onSwipe(){
      let endX = this.data.endX;
      let endY = this.data.endY;
      let startX = this.data.startX;
      let startY = this.data.startY;
      let turn = "";
      if (endX-startX>50 && Math.abs(endY-startY)<50){
        turn = "right";
      }else if(endX-startX<-50 && Math.abs(endY-startY)<50){
        turn = "left";
      }else if(endY-startY<-50 && Math.abs(endX-startX)<50){
        turn = "up";
      }else if(endY-startY>50 && Math.abs(endX-startX)<50){
        turn = "down";
      }
      return turn;
    },
  }
})
