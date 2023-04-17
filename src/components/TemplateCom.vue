<template>
  <div
    class="page"
    @mouseup="drop()"
    @click="bg_click()"
    @keyup.enter="bg_click()"
  >
    <div class="menu">
      <div id="fonts">
        <span id="font_title">Font Style</span>
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
            class="fontOption"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="text_box">
        Edit text
        <input
          id="brandIn"
          v-model="brand"
          type="text"
          @focus="brandCtr == 0 ? ((brand = ''), (brandCtr = 1)) : null"
        />
        <textarea
          id="mottoIn"
          v-model="motto"
          @focus="mottoCtr == 0 ? ((motto = ''), (mottoCtr = 1)) : null"
        />
        <textarea
          scrollable
          id="descIn"
          v-model="desc"
          @focus="descCtr == 0 ? ((desc = ''), (descCtr = 1)) : null"
        />
      </div>
      <div class="elements">
        <span>Elements</span>
        <img
          v-for="flower in flowers"
          :key="flower"
          class="elementImg"
          :src="require(`@/assets/flowersImg/${flower.img}`)"
          @click="changeFlower(flower)"
        />
      </div>
      <div class="importImg">
        <span>Import Image</span>
        <input
          type="file"
          name="product_image"
          ref="uploadFile"
          @change="handleUpload"
          hidden
        />
        <btn class="uploadBtn" @click="$refs.uploadFile.click()"
          ><b-icon-download style="margin-right: 20px"></b-icon-download> Import
          here</btn
        >
      </div>
    </div>
    <div class="colorSet">
      <span>COLOR SET:</span>
      <button
        v-for="color in colorSet"
        :key="color"
        :style="color.style"
        @click="changeColorSet(color.color)"
      ></button>
    </div>
    <div class="bg-view">
      <div class="view" id="capture">
        <div class="text" id="textView">
          <p id="brandView" @click="changeFont('brandView')">{{ brand }}</p>
          <p id="mottoView" @click="changeFont('mottoView')">{{ motto }}</p>
          <p id="descView" @click="changeFont('descView')">
            {{ desc }}
          </p>
        </div>
        <div class="flowers">
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
          <img class="img" id="productImg" :src="productImg" />
        </div>
      </div>
    </div>
    <div class="btn">
      <b-btn class="downloadBtn" @click="download()">Download</b-btn>
      <b-btn class="cancelBtn" @click="download()">Cancel</b-btn>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { flowers } from "@/assets/flowers";
let path1Color = "#f7e6f8";
let path2Color = "#d4cfec";
let path3Color = "#f7e6f8";

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
const colorSet = [
  { color: "#957282", style: "background-color: #957282" },
  { color: "#468faf", style: "background-color: #468faf" },
  { color: "#d91717", style: "background-color: #d91717" },
  { color: "#c6ca00", style: "background-color: #c6ca00" },
];

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
      colorSet,
      svg1: "",
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
      productImg: require(`@/assets/flowersImg/${this.design.productImg}`),
    };
  },
  methods: {
    drag(index) {
      this.index = index;
      this.el = document.getElementById(index);
      this.pickedUp = true;
      this.el.addEventListener("mousemove", this.onDrag);
    },
    drop() {
      this.pickedUp = false;
      // this.el.getAttribute("id");
    },
    onDrag({ movementX, movementY }) {
      if (this.el) {
        let getStyle = window.getComputedStyle(this.el);
        let left = parseInt(getStyle.left);
        let top = parseInt(getStyle.top);
        let height = parseInt(getStyle.height);
        let width = parseInt(getStyle.width);
        // console.log(top, height);
        if (
          this.pickedUp &&
          this.clicked_flower[this.el.getAttribute("id") - 1] &&
          left + movementX > -40 &&
          left + movementX < 640 &&
          // + 100 - parseInt(getStyle.width) &&
          top + movementY > -10 &&
          top + movementY < 340
          // + 100 - parseInt(getStyle.height)
        ) {
          if (top + height > 440) {
            this.el.style.top = `${top - height + 440 - top}px`;
          } else this.el.style.top = `${top + movementY}px`;
          if (left + width > 740) {
            this.el.style.left = `${left - width + 740 - left}px`;
          } else this.el.style.left = `${left + movementX}px`;
        }
        this.el.addEventListener("mouseleave", () => {
          this.pickedUp = false;
        });
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
        let check =
          classN != "drag" && classN != "resizable" && classN != "elementImg";
        if (check && this.index) {
          this.clearBorder(this.index);
          this.clicked_flower[this.index - 1] = false;
          this.el = null;
        }
        if (classN != "form-control" && this.fontEl) {
          this.fontEl.style.border = "0px none #000";
          this.selectedFont = "";
          this.fontEl = null;
        }
        let idN = e.srcElement.getAttribute("id");
        if (this.brand == "" && idN != "brandIn") {
          this.brand = this.design.brand;
          this.brandCtr = 0;
        }
        if (this.motto == "" && idN != "mottoIn") {
          this.motto = this.design.motto;
          this.mottoCtr = 0;
        }
        if (this.desc == "" && idN != "descIn") {
          this.desc = this.design.desc;
          this.descCtr = 0;
        }

        check = idN == "brandIn" || idN == "mottoIn" || idN == "descIn";
        if (check) {
          let el = document.getElementById("textView");
          for (let i = 0; i < el.childElementCount; i++) {
            el.children[i].style.border = "0px none #000";
          }
          if (idN == "brandIn")
            this.fontEl = document.getElementById("brandView");
          else if (idN == "mottoIn")
            this.fontEl = document.getElementById("mottoView");
          else if (idN == "descIn")
            this.fontEl = document.getElementById("descView");

          let elStyle = window.getComputedStyle(this.fontEl);
          let font = elStyle.getPropertyValue("font-family");
          font = font.replace(/['"]+/g, "");
          this.selectedFont = font;
          this.fontEl.style.border = "1px solid #000";
        }
      });

      document.addEventListener("keyup", () => {
        if (this.index) {
          this.clearBorder(this.index);
          this.clicked_flower[this.index - 1] = false;
          this.el = null;
        }
      });
    },
    changeColorSet(color) {
      path1Color = color;
      path3Color = color;
      this.svg1 =
        '<svg id="visual" viewBox="0 0 780 450" width="780" height="450" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><path id="path1" d="M0 199L26 207.3C52 215.7 104 232.3 156 213.7C208 195 260 141 312 153C364 165 416 243 468 246C520 249 572 177 624 136.5C676 96 728 87 754 82.5L780 78L780 0L754 0C728 0 676 0 624 0C572 0 520 0 468 0C416 0 364 0 312 0C260 0 208 0 156 0C104 0 52 0 26 0L0 0Z" fill="' +
        path1Color +
        '"></path><path id="path2" d="M0 303L26 320.2C52 337.3 104 371.7 156 370.2C208 368.7 260 331.3 312 331.3C364 331.3 416 368.7 468 371.7C520 374.7 572 343.3 624 324.7C676 306 728 300 754 297L780 294L780 76L754 80.5C728 85 676 94 624 134.5C572 175 520 247 468 244C416 241 364 163 312 151C260 139 208 193 156 211.7C104 230.3 52 213.7 26 205.3L0 197Z" fill="' +
        path2Color +
        '"></path><path id="path3" d="M0 451L26 451C52 451 104 451 156 451C208 451 260 451 312 451C364 451 416 451 468 451C520 451 572 451 624 451C676 451 728 451 754 451L780 451L780 292L754 295C728 298 676 304 624 322.7C572 341.3 520 372.7 468 369.7C416 366.7 364 329.3 312 329.3C260 329.3 208 366.7 156 368.2C104 369.7 52 335.3 26 318.2L0 301Z" fill="' +
        path3Color +
        '"></path></svg>';

      let path = document.getElementById("capture");
      var encoded = window.btoa(this.svg1);
      path.style.background = "url(data:image/svg+xml;base64," + encoded + ")";
      // layer1.children[0].props.fill = color;
      // layer1.children[1].props.fill = color
      // layer1.children[2].props.fill = color;
    },
    changeFont(id) {
      this.fontEl = document.getElementById(id);
      let elStyle = window.getComputedStyle(this.fontEl);
      let font = elStyle.getPropertyValue("font-family");
      font = font.replace(/['"]+/g, "");
      this.selectedFont = font;

      let el = document.getElementById("textView");
      for (let i = 0; i < el.childElementCount; i++) {
        el.children[i].style.border = "0px none #000";
      }
      this.fontEl.style.border = "1px solid #000";
    },
    loadFont() {
      const fonts = document.getElementById("fontSelect");
      fonts.style.fontFamily = this.selectedFont;
    },
    download() {
      html2canvas(document.querySelector("#capture")).then((canvas) => {
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "download.jpg";
        link.href = canvas.toDataURL();
        link.target = "_blank";
        link.click();
      });
    },
    changeFlower(flower) {
      if (this.el)
        this.el.children[0].children[0].src = require(`@/assets/flowersImg/${flower.img}`);
    },
    handleUpload(event) {
      const selectedfile = event.target.files;
      if (selectedfile.length > 0) {
        const [imageFile] = selectedfile;
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const srcData = fileReader.result;
          console.log("base64:", srcData);
          document.getElementById("productImg").setAttribute("src", srcData);
          this.productImg = srcData;
        };
        fileReader.readAsDataURL(imageFile);
      }
      // const apiKey = "N8Y3iFxzYMHhMiFhKBH7B7V8";
      // const formData = new FormData();
      // formData.append("image_file", image);
      // formData.append("size", "auto");

      // fetch("https://api.remove.bg/v1.0/removebg", {
      //   method: "POST",
      //   headers: {
      //     "X-Api-Key": apiKey,
      //   },
      //   body: formData,
      // })
      //   .then((res) => {
      //     return res.blob();
      //   })
      //   .then((finalRes) => {
      //     console.log(finalRes);
      //     var urlCreator = window.URL || window.webkitURL;
      //     var imageUrl = urlCreator.createObjectURL(finalRes);
      //     this.productImg = imageUrl;
      //   }).catch();
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
  height: 79vh;
  width: 400px;
  position: absolute;
  bottom: 0px;
  left: 0;
  border-top-right-radius: 50px;
  background-color: #ffef9d;
  overflow: auto;
}
.menu::-webkit-scrollbar {
  width: 10px;
}
.menu::-webkit-scrollbar-track {
  margin-block-start: 50px;
  border-radius: 30px;
}
.menu::-webkit-scrollbar-thumb {
  border-radius: 30px;
  background: linear-gradient(transparent, #ffd600);
}
#fonts {
  width: 100%;
  text-align: center;

  span {
    font-size: 1.5em;
    font-weight: bold;
  }
  #fontSelect {
    font-size: 1.5em;
    width: 100%;
    margin-bottom: 30px;
  }
}
.text_box {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;

  * {
    margin: 0 auto;
    margin-bottom: 20px;
    border-radius: 10px;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    border: none;
    color: #717171;
  }

  #brandIn {
    width: 100%;
    height: 50px;
    font-size: 20px;
  }

  #mottoIn {
    width: 100%;
    height: 50px;
    font-size: 15px;
    overflow: auto;
    resize: none;
  }
  #descIn {
    width: 100%;
    height: 75px;
    overflow: auto;
    resize: none;
  }

  *::-webkit-scrollbar {
    display: none;
  }
}
.elements span {
  display: flex;
  justify-content: center;
  font-size: 1.5em;
  font-weight: bold;
}
.elementImg {
  margin: 1em 5px;
  width: 150px;
  height: 150px;
}
.elementImg:hover {
  border: 1px solid #000;
  cursor: pointer;
}
.importImg {
  font-size: 1.5em;
  font-weight: bold;
  width: 270px;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
}
.uploadBtn {
  border: 3px solid #848484;
  width: 100%;
  height: 50px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  color: #848484;
}
.uploadBtn:hover {
  cursor: pointer;
}
.colorSet {
  height: 50px;
  width: fit-content;
  position: absolute;
  left: 500px;
  display: flex;
  span {
    margin-block: auto;
    font-weight: bold;
    font-size: 15px;
    margin-right: 10px;
  }
  button {
    border: 0px none #fff;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    margin: auto 5px;
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
  top: 60px;
  transition: ease background 2s;
}
.bg-view:hover {
  background: #cbcbcb;
}
.view {
  height: 450px;
  background: #d5d2ef;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  aspect-ratio: 780 / 450;
  width: 100%;
  background-image: url("./layer1.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
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
  *:hover {
    cursor: pointer;
    border: 1px solid #000;
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
}
.main-img {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -35%);
  z-index: 0;
  .img {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 100px;
  position: absolute;
  left: 500px;
  bottom: 5px;
  cursor: default;
}
.downloadBtn,
.cancelBtn {
  border-radius: 15px;
  width: 200px;
  height: 70px;
  color: #000;
  font-size: 20px;
  background: #ffef9d;
  border: 5px solid gold;
  transition: background 0.5s, border 0.5s;
}
.downloadBtn {
  position: absolute;
  left: 100px;
}
.downloadBtn:hover,
.cancelBtn:hover {
  border: 5px solid #ffef9d;
  background: gold;
  cursor: pointer;
}
</style>
