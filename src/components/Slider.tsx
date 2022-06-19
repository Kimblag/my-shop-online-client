import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Arrow, Wrapper, Slide, ImgContainer, Image, InfoContainer, Title, Desc } from '../styles/Slider.styles'
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import { sliderItems } from '../data';
import '../styles/slider.css'

const Slider: React.FC = (): JSX.Element => {
    const [slideIndex, setSlideIndex] = useState<number>(0)

    const handleClick = (direction: string): void => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftRoundedIcon />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map((item) => (
                    <Slide key={item.id} bg={item.bg}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>
                                {item.desc}
                            </Desc>
                            <Link to="/shop">
                                <button className="btn">
                                    EXPLORE NOW!
                                </button>
                            </Link>
                        </InfoContainer>
                    </Slide>
                ))}


            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightRoundedIcon />
            </Arrow>
        </Container>
    )
}

export default Slider