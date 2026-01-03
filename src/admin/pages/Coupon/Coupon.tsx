import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/material'
import { Delete, DeleteOutline } from '@mui/icons-material';
import { red } from '@mui/material/colors';


const accountStatuses = [
    { status: "PENDING_VERIFICATION", title: "Pending verification" },
    { status: "ACTIVE", title: "Active" },
    { status: "SUSPENDED", title: "Suspended" },
    { status: "DEACTIVATED", title: "Deactivated" },
    { status: "BANNED", title: "Banned" },
    { status: "CLOSED", title: "Closed" },
];

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

const Coupon = () => {
    const [accountStatus, setAccountStatus] = useState("ACTIVE");

    const handleChange = (event: any) => {
        setAccountStatus(event.target.value);
    }

    return (
        <>
            <div className='pb-5 w-60'>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                    <Select
                        labelId={accountStatus}
                        id="demo-simple-select"
                        value={accountStatus}
                        label="Account Status"
                        onChange={handleChange}
                    >
                        {accountStatuses.map((item) =>
                            <MenuItem value={item.status}>{item.title}</MenuItem>
                        )}

                    </Select>
                </FormControl>

            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Coupon Code</StyledTableCell>
                            <StyledTableCell>Start Date</StyledTableCell>
                            <StyledTableCell>End Date</StyledTableCell>
                            <StyledTableCell align="right">Minium Order Value</StyledTableCell>
                            <StyledTableCell align="right">Discount</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell>{row.calories}</StyledTableCell>
                                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button>
                                        <DeleteOutline sx={{ color: "red" }} />
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Coupon
