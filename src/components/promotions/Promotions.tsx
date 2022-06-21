import { Box, Slide } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { MessageText, PromotionsContainer } from '../../styles/promotions'

const messages = [
  "20% off on all products!",
  "Autumn sale starts now, visit our store!",
  "Free shipping on all orders over $100.",
]


const Promotions = () => {
  const [messageIndex, setMessageIndex] = useState<number>(0)
  const [show, setShow] = useState<boolean>(true)
  //* To prevent the message from flashing on mount
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 3000)
    const intervalId = setInterval(() => {
      setMessageIndex((i: number) => (i + 1) % messages.length)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000)
    }, 4000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <PromotionsContainer ref={containerRef}>
      <Slide container={containerRef.current} direction={show ? "left" : "right"} in={show} timeout={{
        enter: 700,
        exit: 300
      }}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <MessageText>
            {messages[messageIndex]}
          </MessageText>
        </Box>
      </Slide>
    </PromotionsContainer>
  )
}

export default Promotions