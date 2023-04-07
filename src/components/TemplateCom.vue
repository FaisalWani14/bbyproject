<template>
  <div class="bg-view">
    <div class="view">
      <div class="text">
        <p class="brand">Brand</p>
        <p class="motto">motto</p>
        <p class="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
          accusantium doloremque fugiat natus
        </p>
      </div>
      <div class="left-flowers">
        <img
          src="https://picsum.photos/200/301"
          :width="flower_w"
          :height="flower_h"
          class="flower"
        />
        <img
          src="https://picsum.photos/200/301"
          :width="flower_w"
          :height="flower_h"
          class="flower"
        />
        <img
          src="https://picsum.photos/200/301"
          :width="flower_w"
          :height="flower_h"
          class="flower"
        />
      </div>
      <div class="main-img">
        <img src="https://picsum.photos/300/300" />
      </div>
      <div class="right-flowers">
        <img
          src="https://picsum.photos/200/302"
          :width="flower_w"
          :height="flower_h"
          class="flower"
        />
        <img
          src="https://picsum.photos/200/302"
          :width="flower_w"
          :height="flower_h"
          class="flower"
        />
        <img
          src="https://picsum.photos/200/302"
          :width="flower_w"
          :height="flower_h"
          class="flower"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flower_w: 75,
      flower_h: 75,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.bg-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 20px;
  background: #eeeeee;
  position: relative;
  left: 10%;
}
.view {
  height: 450px;
  background: #00ffff;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  border: 1px solid red;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: absolute;
  max-width: 280px;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
}
.main-img {
  position: relative;
  text-align: center;
}
// .text {
//   display: flex;
//   flex-direction: column;
//   text-align: center;
//   position: absolute;
//   max-width: 280px;
//   left: 50%;
//   top: 20%;
//   z-index: 1;
//   line-height: 20px;
//   transform: translate(-50%, -50%);
// }
.left-flowers,
.right-flowers {
  display: flex;
  flex-direction: column;
  min-height: 300px;
  justify-content: space-between;
  margin: 20px;
}
.left-flowers {
}
.right-flowers {
  float: right;
}
</style>
