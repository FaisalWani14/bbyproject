import {flowers} from '../assets/flowers.js'

export const design = [
    {
    id: 1,
    name: "design1",
    flowers: [
        flowers[imgName('red')].img,
        flowers[imgName('pink')].img,
        flowers[imgName('red')].img,
        flowers[imgName('sunflower')].img,
        flowers[imgName('rose')].img,
        flowers[imgName('sunflower')].img,
        ]
    },
    {
    id: 2,
    name: "design2",
    flowers: [
        flowers[imgName('pink')].img,
        flowers[imgName('sunflower')].img,
        flowers[imgName('pink')].img,
        flowers[imgName('rose')].img,
        flowers[imgName('red')].img,
        flowers[imgName('rose')].img,
        ]
    },
    {
    id: 3,
    name: "design3",
    flowers: [
        flowers[imgName('red')].img,
        flowers[imgName('sunflower')].img,
        flowers[imgName('sunflower')].img,
        flowers[imgName('red')].img,
        flowers[imgName('pink')].img,
        flowers[imgName('pink')].img,
        ]
    },
]


function imgName(name) {
    var index = flowers.map(function(e) {
        return e.name;
        }).indexOf(name);
    return index
}

