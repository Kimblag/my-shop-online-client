import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { OrderItem } from '../../redux/interfaces/orders/orders.interfaces';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    open: boolean
    handleOpen: () => void
    handleClose: () => void
    order: OrderItem | undefined
}


const OrderDetail: React.FC<Props> = ({ open, handleOpen, handleClose, order }) => {

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {order?._id}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {order?.products.map(d => d.quantity)}
                        
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default OrderDetail