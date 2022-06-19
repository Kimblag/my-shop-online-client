import imageOne from './assets/slider/img1.jpg'
import imageTwo from './assets/slider/img2.jpg'
import imageThree from './assets/slider/img3.jpg'
import smartphones from './assets/categories/smartphones.jpg'
import laptops from './assets/categories/laptops.jpg'
import headphones from './assets/categories/headphones.jpg'

export const sliderItems = [
    {
        id: 1,
        img: imageOne,
        title: 'Autumn Sale',
        desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
        bg: "#020200" ,
    },
    {
        id: 2,
        img: imageTwo,
        title: 'New iPhone',
        desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
        bg: "#2b2a2e" ,
    },
    {
        id: 3,
        img: imageThree,
        title: 'Sounds like the perfect deal',
        desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
        bg: "#11100f" ,
    },
]


export const categories = [
    {
        id: 1,
        img: laptops,
        title: 'NOTEBOOKS',
    },
    {
        id: 2,
        img: smartphones,
        title: 'SMARTPHONES',
    },
    {
        id: 3,
        img: headphones,
        title: 'HEADPHONES',
    },
]