import {flowers} from '../assets/flowers.js'

export const template = [
    {
    id: 1,
    name: "template1",
    brand: {text: "Brand", font: "Alkatra"},
    motto: {text: "This is motto", font: "Poppins"},
    desc: {text: "This is description section to display text on the screen and itds so cool", font: "Roboto"},
    flowers: [
        flowers[imgName('red')].img,
        flowers[imgName('red')].img,
        flowers[imgName('red')].img,
        flowers[imgName('red')].img,
        flowers[imgName('red')].img,
        flowers[imgName('red')].img,
        ],
    productImg: 'product.png'
    }
]

function imgName(name) {
    var index = flowers.map(function(e) {
        return e.name;
        }).indexOf(name);
    return index
}