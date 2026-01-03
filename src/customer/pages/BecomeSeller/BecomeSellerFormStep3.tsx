import React from 'react'
import { Grid, TextField } from "@mui/material"

interface BecomeSellerFormStep2Props {
    formik: any;
}

const BecomeSellerFormStep3: React.FC<BecomeSellerFormStep2Props> = ({ formik }) => {
    return (
        <div className='space-y-5'>

            <TextField
                fullWidth
                name='bankDetail.accountNumber'
                label='Số tài khoản ngân hàng'
                value={formik.values.bankDetail.accountNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bankDetail?.accountNumber && Boolean(formik.errors.bankDetail?.accountNumber)}
                helperText={formik.touched.bankDetail?.accountNumber && formik.errors.bankDetail?.accountNumber}
            />

            <TextField
                fullWidth
                name='bankDetail.bankName'
                label='Tên ngân hàng'
                value={formik.values.bankDetail.bankName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bankDetail?.bankName && Boolean(formik.errors.bankDetail?.bankName)}
                helperText={formik.touched.bankDetail?.bankName && formik.errors.bankDetail?.bankName}
            />

            <TextField
                fullWidth
                name='bankDetail.accountHolderName'
                label='Tên chủ tài khoản'
                value={formik.values.bankDetail.accountHolderName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bankDetail?.accountHolderName && Boolean(formik.errors.bankDetail?.accountHolderName)}
                helperText={formik.touched.bankDetail?.accountHolderName && formik.errors.bankDetail?.accountHolderName}
            />

        </div>
    )
}

export default BecomeSellerFormStep3
