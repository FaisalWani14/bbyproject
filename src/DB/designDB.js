import {flowers} from '../assets/flowers.js'

export const design = [
    {
    id: 1,
    name: "design1",
    brand: "BRAND NAME",
    motto: "Let your beeuaty shine",
    desc: "This is description section to display text on the screen and itds so cool",
    flowers: [
        flowers[imgName('red')].img,
        flowers[imgName('pink')].img,
        flowers[imgName('red')].img,
        flowers[imgName('sunflower')].img,
        flowers[imgName('rose')].img,
        flowers[imgName('sunflower')].img,
        ],
    productImg: 'product.png'
    },
]


function imgName(name) {
    var index = flowers.map(function(e) {
        return e.name;
        }).indexOf(name);
    return index
}


