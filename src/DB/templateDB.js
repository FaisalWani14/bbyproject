import {flowers} from '../assets/flowers.js'

export const template = [
    {
    id: 1,
    name: "template1",
    brand: {text: "TEMPLATE", font: "Playfair Display"},
    motto: {text: "Template Template",font: "Halleyo Personal Use"},
    desc: {text: "Template template template template template",font: "Roboto"},
    flowers: [
        {img: flowers[imgName('red')].img, left: 0, top: 0},
        {img: flowers[imgName('red')].img, left: 0, top: 0},
        {img: flowers[imgName('red')].img, left: 0, top: 0},
        {img: flowers[imgName('red')].img, left: 0, top: 0},
        {img: flowers[imgName('red')].img, left: 0, top: 0},
        {img: flowers[imgName('red')].img, left: 0, top: 0},        
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