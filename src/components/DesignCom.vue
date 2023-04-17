<template>
  <div
    class="page"
    @click="bg_click()"
    @mouseup="drop()"
    @keyup.enter="bg_click()"
    v-if="dataReady"
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
            v-for="index in saveDesign.flowers.length"
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
                  require(`@/assets/flowersImg/${
                    saveDesign.flowers[index - 1].img
                  }`)
                "
                class="flower"
              />
            </div>
          </div>
        </div>
        <div class="main-img">
          <img class="img" id="productImg" src="productImg" />
        </div>
      </div>
    </div>
    <div class="btn">
      <b-btn class="downloadBtn" @click="save()">Save</b-btn>
      <b-btn class="cancelBtn">Cancel</b-btn>
    </div>
  </div>
</template>

<script>
import { useDesignStore } from "@/stores/designStore";
import html2canvas from "html2canvas";
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
      useDesignStore: useDesignStore(),
    };
  },
  data() {
    return {
      pickedUp: false,
      el: null,
      clicked_flower: [],
      index: 0,
      prev_flower: 99,
      brand: null,
      motto: null,
      desc: null,
      brandCtr: 0,
      mottoCtr: 0,
      descCtr: 0,
      fontEl: null,
      selectedFont: "",
      productImg: null,
      saveDesign: {},
      dataReady: false,
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
    },
    onDrag(e) {
      if (this.el) {
        let getStyle = window.getComputedStyle(this.el);
        let left = parseInt(getStyle.left);
        let top = parseInt(getStyle.top);
        if (
          this.pickedUp &&
          this.clicked_flower[this.el.getAttribute("id") - 1] &&
          left + e.movementX > -40 &&
          left + e.movementX < 640 &&
          top + e.movementY > -10 &&
          top + e.movementY < 340
        ) {
          this.el.style.left = `${left + e.movementX}px`;
          this.el.style.top = `${top + e.movementY}px`;
        }
        this.el.addEventListener("mouseleave", () => {
          this.pickedUp = false;
        });
      }
    },
    clearBorder(index) {
      if (window.location.pathname == "/") {
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
      this.pickedUp = false;
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
          this.brand = this.saveDesign.brand.text;
          this.brandCtr = 0;
        }
        if (this.motto == "" && idN != "mottoIn") {
          this.motto = this.saveDesign.motto.text;
          this.mottoCtr = 0;
        }
        if (this.desc == "" && idN != "descIn") {
          this.desc = this.saveDesign.desc.text;
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
    save() {
      html2canvas(document.querySelector("#capture")).then((canvas) => {
        var link = document.createElement("a");
        let imgUrl = canvas.toDataURL();
        document.body.appendChild(link);
        link.download = "download.jpg";
        link.href = imgUrl;
        link.target = "_blank";
        // link.click();
        this.saveDesign.brand.text = this.brand;
        this.saveDesign.brand.font = window
          .getComputedStyle(document.getElementById("brandView"))
          .fontFamily.replace(/['"]+/g, "");
        this.saveDesign.motto.text = this.motto;
        this.saveDesign.motto.font = window
          .getComputedStyle(document.getElementById("mottoView"))
          .fontFamily.replace(/['"]+/g, "");
        this.saveDesign.desc.text = this.desc;
        this.saveDesign.desc.font = window
          .getComputedStyle(document.getElementById("descView"))
          .fontFamily.replace(/['"]+/g, "");
        for (let i = 0; i < 6; i++) {
          let flower = window.getComputedStyle(document.getElementById(i + 1));
          this.saveDesign.flowers[i].left = flower.left;
          this.saveDesign.flowers[i].top = flower.top;
        }
        this.saveDesign.productImg = this.productImg;

        this.useDesignStore.design = this.saveDesign;

        // this.useDesignStore.designId = 1
        // this.useDesignStore.designName = "design2"
        // this.useDesignStore.designBrand = "FAISAL"
        // this.useDesignStore.designMotto = "WANI"
        // this.useDesignStore.designDesc= "SHAH"
        // this.useDesignStore.designFlower1= this.
        // this.useDesignStore.designFlower2= 1
        // this.useDesignStore.designFlower3= 1
        // this.useDesignStore.designFlower4= 1
        // this.useDesignStore.designFlower5= 1
        // this.useDesignStore.designFlower6= 1
        // this.useDesignStore.designImg = 1
      });
    },
    changeFlower(flower) {
      if (this.el) {
        let id = this.el.getAttribute("id");
        this.saveDesign.flowers[id - 1].img = flower.img;
        this.el.children[0].children[0].src = require(`@/assets/flowersImg/${flower.img}`);
      }
    },
    convertImageToBase64(imgUrl) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const srcData = fileReader.result;
        return srcData;
      };
      fileReader.readAsDataURL(imgUrl);
    },
    handleUpload(event) {
      const selectedfile = event.target.files;
      if (selectedfile.length > 0) {
        const [imageFile] = selectedfile;
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const srcData = fileReader.result;
          console.log("base64:", srcData);
          this.productImg = srcData;
        };
        fileReader.readAsDataURL(imageFile);
      }
      // const image = event.target.files[0];
      // const apiKey = "37SnaYyBqGDbk53PCLYRATJ8";
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
      //     var urlCreator = window.URL || window.webkitURL;
      //     var imageUrl = urlCreator.createObjectURL(finalRes);
      //     this.productImg = imageUrl;
      //   })
      //   .catch();
    },
    getDesign() {
      this.saveDesign = this.useDesignStore.design;
      this.brand = this.saveDesign.brand.text;
      this.motto = this.saveDesign.motto.text;
      this.desc = this.saveDesign.desc.text;
    },
    setDesign() {
      document.getElementById("brandView").style.fontFamily =
        this.saveDesign.brand.font;
      document.getElementById("mottoView").style.fontFamily =
        this.saveDesign.motto.font;
      document.getElementById("descView").style.fontFamily =
        this.saveDesign.desc.font;
      document
        .getElementById("productImg")
        .setAttribute("src", this.saveDesign.productImg);

      for (let i = 1; i < 7; i++) {
        let flower = document.getElementById(i);
        flower.style.left = this.saveDesign.flowers[i - 1].left;
        flower.style.top = this.saveDesign.flowers[i - 1].top;
      }
      let i;
      for (i = 0; i < 6; i += 1) {
        this.clicked_flower[i] = false;
      }
      const fonts = document.getElementById("fontSelect");
      for (i = 0; i < fonts.childElementCount; i++) {
        let font = fonts.children[i].value;
        fonts.children[i].style.fontFamily = font;
      }
      const bg = document.getElementById("capture");
      bg.style.backgroundImage = "./layer1.svg";
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
  async mounted() {
    await this.getDesign();
    this.dataReady = true;
    await console.log("hi");
    this.setDesign();

    console.log(this.saveDesign);
    console.log(this.saveDesign.flowers);
    console.log(this.saveDesign.flowers.length);
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

.bg-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 20px;
  background: #eeeeee;
  position: relative;
  top: 10%;
  left: 10%;
  transition: ease background 2s;
}
.bg-view:hover {
  background: #cbcbcb;
}
.view {
  height: 450px;
  border-radius: 20px;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  position: relative;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.6);

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
  position: absolute;
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
  cursor: default;
}
.btn:hover {
  border: 0px none #000;
  *:active {
    background: #b99d00;
    border: 10px solid #fff;
  }
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
