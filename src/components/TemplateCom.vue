<template>
  <div class="page" @mouseup="drop()">
    <div class="menu">
      <div id="fonts">
        <span id="font_title">Font Style</span>
        <!-- <select id="fontSelect" v-model="selectedFont" @click="loadFont()">
          <option
            class="options"
            v-for="(option, index) in fontsOption"
            :key="index"
            :value="option"
          >
            {{ option }}
          </option>
        </select> -->
        <select
          v-model="selectedFont"
          class="form-control"
          id="fontSelect"
          :required="true"
        >
          <option
            v-for="option in fontsOption"
            :key="option"
            :value="option"
            :selected="option == 'Roboto'"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="text_box">
        Edit text
        <input
          id="brand"
          v-model="brand"
          type="text"
          @focus="brandCtr == 0 ? ((brand = ''), (brandCtr = 1)) : null"
        />
        <input
          id="motto"
          v-model="motto"
          type="text"
          @focus="mottoCtr == 0 ? ((motto = ''), (mottoCtr = 1)) : null"
        />
        <textarea
          id="desc"
          v-model="desc"
          type="text"
          @focus="descCtr == 0 ? ((desc = ''), (descCtr = 1)) : null"
        />
      </div>
      <div class="elements"></div>
    </div>
    <div class="bg-view">
      <div class="view">
        <div class="text">
          <p id="brandView" @click="changeFont('brandView')">{{ brand }}</p>
          <p id="mottoView" @click="changeFont('mottoView')">{{ motto }}</p>
          <p id="descView" @click="changeFont('descView')">
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
const fontsOption = [
  "Ariel",
  "Inter",
  "Kanit",
  "Lora",
  "Montserrat",
  "Open Sans",
  "Oswald",
  "Playfair Display",
  "Prompt",
  "Roboto",
  "Ubuntu",
  "Halleyo Personal Use",
];
// fontsOption.sort();

let zIn = 1;
let mouse = false;
document.addEventListener("mousedown", () => (mouse = false));
document.addEventListener("mousemove", () => (mouse = true));

export default {
  props: { design: Object },
  setup() {
    return {
      flowers,
      fontsOption,
    };
  },
  data() {
    return {
      pickedUp: false,
      el: null,
      clicked_flower: [],
      index: 0,
      prev_flower: 99,
      brand: this.design.brand,
      motto: this.design.motto,
      desc: this.design.desc,
      brandCtr: 0,
      mottoCtr: 0,
      descCtr: 0,
      font1: "Open Sans",
      fontEl: null,
      selectedFont: "",
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
        let classN = e.srcElement.getAttribute("class");
        let check = classN != "drag" && classN != "resizable";
        if (check && this.index) {
          this.clearBorder(this.index);
          this.clicked_flower[this.index - 1] = false;
        }
      });
    },
    changeFont(id) {
      this.fontEl = document.getElementById(id);
      let font = window
        .getComputedStyle(this.fontEl)
        .getPropertyValue("font-family");
      font = font.replace(/['"]+/g, "");
      this.selectedFont = font;
    },
    loadFont() {
      const fonts = document.getElementById("fontSelect");
      fonts.style.fontFamily = this.selectedFont;
    },
  },
  watch: {
    selectedFont() {
      if (this.fontEl) {
        this.fontEl.style.fontFamily = this.selectedFont;
      }
      this.loadFont();
    },
  },
  mounted() {
    for (let i = 0; i < 6; i += 1) {
      this.clicked_flower[i] = false;
    }
    const fonts = document.getElementById("fontSelect");
    for (let i = 0; i < fonts.childElementCount; i++) {
      let font = fonts.children[i].value;
      fonts.children[i].style.fontFamily = font;
    }
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter&family=Kanit:wght@300&family=Lora:wght@500&family=Montserrat:wght@300&family=Open+Sans&family=Oswald&family=Playfair+Display:wght@900&family=Prompt:wght@300&family=Roboto:wght@300&family=Ubuntu&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Roboto:wght@300&display=swap");
@import url("https://fonts.cdnfonts.com/css/halleyo-personal-use");
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
  background-color: #ffef9d;
  overflow-x: hidden;
  overflow-y: scroll;
}
#fonts {
  width: 300px;
  height: 300px;
  margin-bottom: 50px;
  text-align: center;
  span {
    font-size: 1.5em;
    font-weight: bold;
  }
}
#fontSelect {
  border: #ffef9d;
  size: 20px;
  width: 300px;
  font-size: 1.5em;
}
.text_box {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
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
    border-radius: 10px;
  }

  *[type="text"] {
    height: 3em;
    font-size: 15px;
    text-align: center;
    color: #000;
    font-weight: 500;
  }

  #brand {
    width: 80%;
    height: 5em;
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
  background: #d5d2ef;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.text {
  position: absolute;
  max-width: 280px;
  top: 10px;
  left: 50%;
  z-index: 1;
  transform: translate(-50%);
  * {
    text-align: center;
    margin-bottom: 0.2em;
  }
  #brandView {
    font-family: "Playfair Display";
    font-size: 1.5em;
  }
  #mottoView {
    font-family: "Halleyo Personal Use";
    font-size: 1.2em;
    position: relative;
    top: -3px;
  }
  #descView {
    line-height: 1.2em;
    font-family: "Roboto";
    font-size: 0.8em;
    position: relative;
    top: 3px;
  }
  * {
    border: 1px solid #000;
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
