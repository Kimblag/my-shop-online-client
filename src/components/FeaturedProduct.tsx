import React from 'react'
import { Image, ImageCard, ImageCardInner, Card, CardContent, Text, ImageContainer, Paragraph, Button } from '../styles/Featured.styles'

type Props = {
    item: {
        id: number,
        title: string,
        img: string,
        paragraph: string,
    }
}

const FeaturedProduct: React.FC<Props> = ({ item }): JSX.Element => {
    return (
        <Card>
            <CardContent>
                <Text>{item.title}</Text>
                <Paragraph>
                    {item.paragraph}
                </Paragraph>
                <Button>Shop Product</Button>
            </CardContent>
            <ImageContainer>
                <ImageCard>
                    <ImageCardInner>
                        <Image src={item.img} alt="featuredProduct" />
                    </ImageCardInner>
                </ImageCard>
            </ImageContainer>
        </Card>
    )
}

export default FeaturedProduct