import imageOne from './assets/slider/img1.jpg'
import imageTwo from './assets/slider/img2.jpg'
import imageThree from './assets/slider/img3.jpg'
import smartphones from './assets/categories/smartphones.jpg'
import laptops from './assets/categories/laptops.jpg'
import headphones from './assets/categories/headphones.jpg'
import featuredOne from './assets/featured/featured1.png'

export const sliderItems = [
    {
        id: 1,
        img: imageOne,
        title: 'Autumn Sale',
        desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
        bg: "#020200",
    },
    {
        id: 2,
        img: imageTwo,
        title: 'New iPhone',
        desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
        bg: "#2b2a2e",
    },
    {
        id: 3,
        img: imageThree,
        title: 'Sounds like the perfect deal',
        desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
        bg: "#11100f",
    },
]


export const categories = [
    {
        id: 1,
        img: laptops,
        title: 'NOTEBOOKS',
        filter: {
            brand: 'AllBrands',
            category: 'Notebooks',
            order: 'All'
        }
    },
    {
        id: 2,
        img: smartphones,
        title: 'SMARTPHONES',
        filter: {
            brand: 'AllBrands',
            category: 'Smartphones',
            order: 'All'
        }
    },
    {
        id: 3,
        img: headphones,
        title: 'HEADPHONES',
        filter: {
            brand: 'AllBrands',
            category: 'Headphones',
            order: 'All'
        }
    },
]

export const featured = [
    {
        id: 1,
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_648428-MLA46516517286_062021-F.webp",
        title: 'Notebook Probook 450 G1',
        paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        id: 2,
        img: featuredOne,
        title: 'iPhone 11 Pro',
        paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
]