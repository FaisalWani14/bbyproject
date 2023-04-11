<template>
  <div class="page" @mouseup="drop()">
    <div class="menu">
      <div class="fonts">Fonts</div>
      <div class="text_box">
        <input
          id="brand"
          v-model="brand"
          type="text"
          :placeholder="design.brand.text"
        />
        <input
          id="motto"
          v-model="motto"
          type="text"
          :placeholder="design.motto.text"
        />
        <textarea
          id="desc"
          v-model="desc"
          type="text"
          :placeholder="design.desc.text"
        />
      </div>
    </div>
    <div class="bg-view">
      <div class="view">
        <div class="text">
          <p id="brand">{{ brand }}</p>
          <p id="motto">{{ motto }}</p>
          <p id="description">
            {{ desc }}
          </p>
        </div>
        <div class="flowers" @click="bg_click()">
          <div
            class="resizable"
            v-for="index in design.flowers.length"
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
                  require(`@/assets/flowersImg/${design.flowers[index - 1]}`)
                "
                class="flower"
              />
            </div>
          </div>
        </div>
        <div class="main-img">
          <img
            class="img"
            :src="require(`@/assets/flowersImg/${design.productImg}`)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { flowers } from "@/assets/flowers";

let zIn = 1;
let mouse = false;
document.addEventListener("mousedown", () => (mouse = false));
document.addEventListener("mousemove", () => (mouse = true));

document.addEventListener("mousedown", (e) => {
  console.log(e.target.id);
  if (e.target.id == "brand") {
    this.brand = "";
  } else if (e.target.id == "motto") {
    this.motto = "";
  } else if (e.target.id == "desc") {
    this.desc = "";
  }
});

export default {
  props: { design: Object },
  setup() {
    return {
      flowers,
    };
  },
  data() {
    return {
      pickedUp: false,
      el: null,
      clicked_flower: [],
      index: 0,
      prev_flower: 99,
      brand: this.design.brand.text,
      motto: this.design.motto.text,
      desc: this.design.desc.text,
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
@import url("https://fonts.googleapis.com/css2?family=Alkatra:wght@700&family=Poppins:wght@200&family=Roboto:ital@1&display=swap");
@mixin prevent_select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
.menu {
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 2em;
  border: 1px solid #000;
  height: 79vh;
  width: 400px;
  position: absolute;
  bottom: 0px;
  left: 0;
  border-top-right-radius: 50px;
  background-color: gold;
}
.fonts {
  border: 1px solid #000;
  width: 300px;
  height: 300px;
  margin-bottom: 50px;
}
.text_box {
  border: 1px solid #000;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  * {
    margin: 0 auto;
    margin-bottom: 2em;
    word-wrap: break-word;
    word-break: break-all;
    width: fit-content;
  }
  #brand {
    width: 80%;
    height: 5em;
  }
  *::placeholder,
  *[type="text"] {
    height: 3em;
    font-size: 20px;
    text-align: center;
    color: #000;
  }

  #motto {
    height: 3em;
  }
  #desc {
    width: 100%;
    height: 4em;
  }
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
  max-height: 200px;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: absolute;
  max-width: 280px;
  top: 50px;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  * {
    margin-bottom: -5px;
    margin-inline: 20px;
  }
  #brand {
    min-width: 240px;
    text-align: right;
    font-family: "Alkatra";
    font-size: 2.5em;
    margin-bottom: -1rem;
  }
  #motto {
    font-family: "Poppins";
    font-size: 1em;
  }
  #description {
    line-height: 1em;
    font-family: "Roboto";
    font-size: 0.8em;
  }
}
.main-img {
  position: absolute;
  transform: scale(50%);
  z-index: 0;
  top: -8em;
  .img {
    width: 100%;
  }
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
