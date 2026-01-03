// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//         backgroundColor: theme.palette.common.black,
//         color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//         fontSize: 14,
//     },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     '&:last-child td, &:last-child th': {
//         border: 0,
//     },
// }));

// function createData(
//     name: string,
//     calories: number,
//     fat: number,
//     carbs: number,
//     protein: number,
// ) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function OrderTable() {
//     return (
//         <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                 <TableHead>
//                     <TableRow>
//                         <StyledTableCell>Order Id</StyledTableCell>
//                         <StyledTableCell>Sản phẩm</StyledTableCell>
//                         <StyledTableCell align="right">Địa chỉ giao hàng</StyledTableCell>
//                         <StyledTableCell align="right">Trạng thái đơn hàng</StyledTableCell>
//                         <StyledTableCell align="right">Cập nhật</StyledTableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {rows.map((row) => (
//                         <StyledTableRow key={row.name}>
//                             <StyledTableCell component="th" scope="row">
//                                 {row.name}
//                             </StyledTableCell>
//                             <StyledTableCell>{row.calories}</StyledTableCell>
//                             <StyledTableCell align="right">{row.fat}</StyledTableCell>
//                             <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//                             <StyledTableCell align="right">{row.protein}</StyledTableCell>
//                         </StyledTableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }

import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
    Table, TableBody, TableCell, tableCellClasses, TableContainer,
    TableHead, TableRow, Paper, Select, MenuItem, FormControl,
    CircularProgress, Typography, Box
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchSellerOrders, updateSellerOrderStatus } from '../../../State/seller/sellerOrderSlice';
import { Order } from '../../../types/OrderTypes';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// Khớp với Enum OrderStatus từ backend
const orderStatusList = [
    { label: "Chờ xác nhận", value: "PENDING" },
    { label: "Đã xác nhận", value: "CONFIRMED" },
    { label: "Đang giao", value: "SHIPPED" },
    { label: "Đã giao", value: "DELIVERED" },
    { label: "Đã hủy", value: "CANCELLED" },
];

export default function OrderTable() {
    const dispatch = useAppDispatch();
    const { orders, loading } = useAppSelector((state) => state.sellerOrder);
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (jwt) {
            dispatch(fetchSellerOrders(jwt));
        }
    }, [dispatch, jwt]);

    const handleUpdateStatus = (orderId: number, status: string) => {
        if (jwt) {
            dispatch(updateSellerOrderStatus({ jwt, orderId, status }));
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={5}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID Đơn hàng</StyledTableCell>
                        <StyledTableCell>Sản phẩm & Số lượng</StyledTableCell>
                        <StyledTableCell>Khách hàng & Địa chỉ</StyledTableCell>
                        <StyledTableCell align="right">Tổng tiền</StyledTableCell>
                        <StyledTableCell align="center">Trạng thái</StyledTableCell>
                        <StyledTableCell align="center">Thao tác</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order: Order) => (
                        <StyledTableRow key={order.id}>
                            {/* ID Đơn hàng */}
                            <StyledTableCell component="th" scope="row">
                                <Typography variant="body2" fontWeight="bold">
                                    #{order.id}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                                </Typography>
                            </StyledTableCell>

                            {/* Sản phẩm & Số lượng */}
                            <StyledTableCell>
                                {order.orderItems.map((item) => (
                                    <Box key={item.id} mb={0.5}>
                                        <Typography variant="body2">
                                            • {item.product.title}
                                            <span style={{ color: '#007bff', fontWeight: 'bold' }}> x{item.quantity}</span>
                                        </Typography>
                                    </Box>
                                ))}
                                <Typography variant="caption" sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}>
                                    Tổng: {order.totalItem} sản phẩm
                                </Typography>
                            </StyledTableCell>

                            {/* Khách hàng & Địa chỉ */}
                            <StyledTableCell>
                                <Typography variant="body2" fontWeight="medium">
                                    {order.shippingAddress.name}
                                </Typography>
                                <Typography variant="caption" display="block">
                                    SĐT: {order.shippingAddress.mobile}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {order.shippingAddress.address}, {order.shippingAddress.locality}, {order.shippingAddress.city}
                                </Typography>
                            </StyledTableCell>

                            {/* Tổng tiền */}
                            <StyledTableCell align="right">
                                <Typography variant="body2" color="primary" fontWeight="bold">
                                    {order.totalSellingPrice?.toLocaleString('vi-VN')}đ
                                </Typography>
                            </StyledTableCell>

                            {/* Trạng thái hiện tại */}
                            <StyledTableCell align="center">
                                <Box
                                    sx={{
                                        py: 0.5, px: 1.5, borderRadius: '20px', display: 'inline-block',
                                        bgcolor: order.orderStatus === 'DELIVERED' ? '#e8f5e9' : order.orderStatus === 'CANCELLED' ? '#ffebee' : '#e3f2fd',
                                        color: order.orderStatus === 'DELIVERED' ? '#2e7d32' : order.orderStatus === 'CANCELLED' ? '#c62828' : '#1976d2',
                                        fontSize: '0.75rem', fontWeight: 'bold'
                                    }}
                                >
                                    {order.orderStatus}
                                </Box>
                            </StyledTableCell>

                            {/* Dropdown Cập nhật */}
                            <StyledTableCell align="center">
                                <FormControl size="small" fullWidth sx={{ minWidth: 130 }}>
                                    <Select
                                        value={order.orderStatus}
                                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                        sx={{ fontSize: '0.8rem' }}
                                    >
                                        {orderStatusList.map((status) => (
                                            <MenuItem key={status.value} value={status.value} sx={{ fontSize: '0.8rem' }}>
                                                {status.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            {orders.length === 0 && (
                <Box p={5} textAlign="center">
                    <Typography color="textSecondary">Chưa có đơn hàng nào được đặt.</Typography>
                </Box>
            )}
        </TableContainer>
    );
}