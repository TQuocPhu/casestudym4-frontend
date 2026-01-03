import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const CreateDealForm = () => {
    const formik = useFormik({
        initialValues: {
            discount: 0,
            category: ""
        },
        onSubmit: (values) => {
            console.log("submit ", values)
        }
    });
    return (
        <Box component={"form"} onSubmit={formik.handleSubmit}
            className='space-y-6'
        >
            <Typography variant='h4' className='text-center'>
                Create Deal
            </Typography>

            <TextField
                fullWidth
                name='discount'
                label="Discount"
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.discount && Boolean(formik.errors.discount)}
                helperText={formik.touched.discount && formik.errors.discount}
            />

            <Divider />

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.category}
                    label="Category"
                    onChange={formik.handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                </Select>
            </FormControl>

            <Button sx={{ py: ".9rem" }} fullWidth type='submit' variant='contained'>
                Create Deal
            </Button>

        </Box>
    )
}

export default CreateDealForm
