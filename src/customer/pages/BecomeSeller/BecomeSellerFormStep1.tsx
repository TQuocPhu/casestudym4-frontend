import { Box, TextField } from '@mui/material'
import React from 'react'

const BecomeSellerFormStep1 = ({ formik }: any) => {
    return (
        <Box>
            <p className='text-xl font-bold text-center pb-9'>
                Liên hệ chi tiết
            </p>

            <div className='space-y-9'>

                <TextField
                    fullWidth
                    name='mobile'
                    label="Số điện thoại"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                />

                <TextField
                    fullWidth
                    name='TIN'
                    label="Mã số thuế"
                    value={formik.values.TIN}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.TIN && Boolean(formik.errors.TIN)}
                    helperText={formik.touched.TIN && formik.errors.TIN}
                />

            </div>
        </Box>
    )
}

export default BecomeSellerFormStep1
