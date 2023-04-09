<template>
  <div class="page" @mouseup="drop()">
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
        <div class="flowers" @click="bg_click()">
          <div
            class="resizable"
            v-for="index in design[1].flowers.length"
            :key="index"
            :id="index"
          >
            <div
              class="drag"
              @mousedown="drag(index)"
              @click="select_flower(index)"
            >
              <img
                :src="
                  require(`@/assets/flowersImg/${design[2].flowers[index - 1]}`)
                "
                class="flower"
              />
            </div>
          </div>
        </div>
        <div class="main-img">
          <img src="@/assets/flowersImg/product.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { flowers } from "@/assets/flowers";
import { design } from "../DB/designDB";
let zIn = 1;
let mouse = false;
document.addEventListener("mousedown", () => (mouse = false));
document.addEventListener("mousemove", () => (mouse = true));

export default {
  setup() {
    return {
      flowers,
      design,
    };
  },
  data() {
    return {
      pickedUp: false,
      el: null,
      clicked_flower: [],
      index: 0,
      prev_flower: 99,
    };
  },
  methods: {
    drag(index) {
      this.index = index;
      this.el = document.getElementById(index);
      // this.el.style.position = "relative";
      this.pickedUp = true;
      this.el.addEventListener("mousemove", this.onDrag);
      // this.el.style.cursor = "nw-resize";
    },
    drop() {
      this.pickedUp = false;
      // this.el.getAttribute("id");
    },
    onDrag({ movementX, movementY }) {
      let getStyle = window.getComputedStyle(this.el);
      if (
        this.pickedUp &&
        this.clicked_flower[this.el.getAttribute("id") - 1]
      ) {
        let left = parseInt(getStyle.left);
        let top = parseInt(getStyle.top);

        this.el.style.left = `${left + movementX}px`;
        this.el.style.top = `${top + movementY}px`;
      }
    },
    clearBorder(index) {
      if (window.location.pathname == "/template") {
        let prev = document.getElementById(index);
        prev.style.resize = "none";
        prev.style.overflow = "auto";
        prev.style.border = "0px none";
        prev.style.cursor = "pointer";
      }
    },
    select_flower(index) {
      this.el = document.getElementById(index);
      let getStyle = window.getComputedStyle(this.el);
      let check = getStyle.border == "0px none rgb(33, 37, 41)";
      if (!mouse) {
        if (check) {
          this.clicked_flower[index - 1] = true;
        } else {
          this.clicked_flower[index - 1] = false;
        }

        for (let i = 0; i < 6; i++) {
          if (i != index - 1) {
            this.clicked_flower[i] = false;
          }
        }

        if (this.clicked_flower[index - 1]) {
          if (this.prev_flower == 99) {
            this.prev_flower = index;
            if (this.prev_flower != index) {
              this.clearBorder(this.prev_flower);
            }
          } else {
            this.clearBorder(this.prev_flower);
            this.prev_flower = index;
          }
          this.el.style.resize = "both";
          this.el.style.overflow = "auto";
          this.el.style.border = "2px solid black";
          this.el.style.zIndex = ++zIn;
        } else {
          this.clearBorder(index);
        }
      }
    },
    bg_click() {
      document.addEventListener("mousedown", (e) => {
        console.log(e);
        let classN = e.srcElement.getAttribute("class");
        let check = classN != "drag" && classN != "resizable";
        if (check && this.index) {
          this.clearBorder(this.index);
          this.clicked_flower[this.index - 1] = false;
        }
      });
    },
  },
  mounted() {
    for (let i = 0; i < 6; i += 1) {
      this.clicked_flower[i] = false;
    }
    console.log(this.clicked_flower);
  },
};
</script>

<style lang="scss" scoped>
@mixin prevent_select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.bg-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 10px;
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
  position: relative;
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
  position: absolute;
  transform: scale(40%);
  left: -200px;
  z-index: 0;
}
.flowers {
  margin: 30px;
  position: relative;
  height: 100%;
  width: 100%;
}
.resizable {
  margin: 10px;
  position: absolute;
  width: 100px;
  height: 100px;
  z-index: 1;
  @include prevent_select();
}
.drag {
  height: 100%;
}
.resizable:hover {
  cursor: pointer;
}
.drag:active {
  cursor: grabbing;
  z-index: 1000;
}
.flower {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: -2;
}
.resizable:nth-child(6) {
  top: 300px;
  left: 500px;
}
.resizable:nth-child(5) {
  top: 200px;
  left: 550px;
}
.resizable:nth-child(4) {
  top: 100px;
  left: 500px;
}
.resizable:nth-child(3) {
  top: 300px;
  left: 100px;
}
.resizable:nth-child(2) {
  top: 200px;
  left: 50px;
}
.resizable:nth-child(1) {
  top: 100px;
  left: 100px;
}
</style>
