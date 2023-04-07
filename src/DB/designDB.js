import {flowers} from '../assets/flowers.js'

export const design = [
    {
    id: 1,
    name: "design1",
    flower1: flowers[imgName('red')].img,
    flower2: flowers[imgName('pink')].img,
    flower3: flowers[imgName('red')].img,
    flower4: flowers[imgName('sunflower')].img,
    flower5: flowers[imgName('rose')].img,
    flower6: flowers[imgName('sunflower')].img,
    },
    {
    id: 2,
    name: "design2",
    flower1: flowers[imgName('pink')].img,
    flower2: flowers[imgName('sunflower')].img,
    flower3: flowers[imgName('pink')].img,
    flower4: flowers[imgName('rose')].img,
    flower5: flowers[imgName('red')].img,
    flower6: flowers[imgName('rose')].img,
    },
    {
    id: 3,
    name: "design3",
    flower1: flowers[imgName('red')].img,
    flower2: flowers[imgName('sunflower')].img,
    flower3: flowers[imgName('sunflower')].img,
    flower4: flowers[imgName('red')].img,
    flower5: flowers[imgName('pink')].img,
    flower6: flowers[imgName('pink')].img,
    },
]


function imgName(name) {
    var index = flowers.map(function(e) {
        return e.name;
        }).indexOf(name);
    return index
}

