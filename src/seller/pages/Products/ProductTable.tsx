import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import store, { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchSellerProducts } from '../../../State/seller/sellerProductSlice';
import React from 'react';
import { Product } from '../../../types/ProductTypes';
import { colors } from './../../../data/Filter/color';
import { Button, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { teal } from '@mui/material/colors';

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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ProductTable() {
    const dispatch = useAppDispatch();
    const { sellerProduct } = useAppSelector(store => store);

    React.useEffect(() => {
        dispatch(fetchSellerProducts(localStorage.getItem('jwt')));
    }, [])


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Hình ảnh</StyledTableCell>
                        <StyledTableCell align="right">Tên sản phẩm</StyledTableCell>
                        <StyledTableCell align="right">Giá niêm yết tối đa</StyledTableCell>
                        <StyledTableCell align="right">Giá bán</StyledTableCell>
                        <StyledTableCell align="right">Màu sắc</StyledTableCell>
                        <StyledTableCell align="right">Số lượng</StyledTableCell>
                        <StyledTableCell align="right">Cập nhật kho</StyledTableCell>
                        <StyledTableCell align="right">Cập nhật</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sellerProduct.products.map((item: Product) => (
                        <StyledTableRow key={item.id}>
                            <StyledTableCell component="th" scope="item">
                                <div className='flex gap-1 flex-wrap'>
                                    {item.images.map((image) => <img className='w-[170px] rounded-md' alt='' src={image} />)}
                                </div>
                            </StyledTableCell>
                            <StyledTableCell>{item.title}</StyledTableCell>
                            <StyledTableCell align="right">{item.mrpPrice} đ</StyledTableCell>
                            <StyledTableCell align="right">{item.sellingPrice} đ</StyledTableCell>
                            <StyledTableCell align="right">{item.color}</StyledTableCell>
                            <StyledTableCell align="right">{item.quantity}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button size='small'>
                                    {item.quantity > 0 ? "in_stock" : "out_stock"}
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <IconButton>
                                    <Edit sx={{ color: teal[500] }} />
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}