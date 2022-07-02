import React, { useEffect, useState } from 'react'
import { OrderItem } from '../../redux/interfaces/orders/orders.interfaces';
import DataTable from 'react-data-table-component'
import { useAppSelector } from '../../redux/hooks';
import { Avatar, Button, Container, Divider, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ProductDocument } from '../../redux/interfaces/products/product.interface';


type Props = {
  user: {
    status: string;
    data: OrderItem[];
  }
}


const UserOrders: React.FC<Props> = ({ user }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const [data, setData] = useState<OrderItem[]>([])
  const { userData } = useAppSelector(state => state.orders)
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = useState<OrderItem>()
  const { products } = useAppSelector(state => state.products)

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: matches ? 300 : 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const handleOpen = (order: React.SetStateAction<OrderItem | undefined>) => {
    setOpen(true)
    setOrder(order)
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {

    setData(userData.data)
  }, [userData])
  const columns = [
    {
      name: 'ID',
      selector: (row: { _id: any; }) => row._id
    },
    {
      name: 'Status',
      selector: (row: { status: any; }) => row.status
    },
    {
      name: 'Amount',
      selector: (row: { amount: any; }) => row.amount
    },
    {
      name: 'Action',
      cell: (row: OrderItem) => <Button variant='contained' onClick={() => {
        handleOpen(row)

      }}>Details</Button>
    },
  ]

  let array: any = []
  const findProducts = () => {
    order?.products.forEach(product => {
      return array?.push(products.find((ele: any) => ele._id === product.productId))
    })
    return array
  }
  findProducts()

  return (
    <>
      <Typography sx={{ml: 4, mt: 4, fontFamily: "Montez"}} variant='h3'>
        My Orders
      </Typography>
      <Container sx={{ m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <DataTable columns={columns} data={data} pagination highlightOnHover />
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Order Id: {order?._id}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Amount: ${order?.amount}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Status: {order?.status}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Date: {order?.createdAt.slice(0, 10)}
            </Typography>
            <Box>
              {array.map((product: ProductDocument) => (
                <>
                  <Divider />
                  <Box margin={2} display='flex' flexDirection='row' justifyContent={'space-between'} >
                    <Avatar src={product.image} />
                    <Typography>{product.name}</Typography>
                    <Typography>Price: ${product.price}</Typography>
                  </Box>
                </>
              ))}
            </Box>
          </Box>
        </Modal>
      </Container>
    </>
  )
}

export default UserOrders