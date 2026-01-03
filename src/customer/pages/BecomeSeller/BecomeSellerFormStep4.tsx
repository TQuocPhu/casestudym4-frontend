import React from 'react'
import { TextField } from '@mui/material'

interface BecomeSellerFormStep2Props {
    formik: any;
}

const BecomeSellerFormStep4 = ({ formik }: BecomeSellerFormStep2Props) => {
    return (
        <div className='space-y-5'>

            <TextField
                fullWidth
                name='businessDetail.businessName'
                label='Tên doanh nghiệp'
                value={formik.values.businessDetail.businessName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched?.businessDetail?.businessName && Boolean(formik.errors?.businessDetail?.businessName)}
                helperText={formik.touched?.businessDetail?.businessName && formik.errors?.businessDetail?.businessName}
            />

            <TextField
                fullWidth
                name='sellerName'
                label='Tên shop'
                value={formik.values.sellerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
                helperText={formik.touched.sellerName && formik.errors.sellerName}
            />

            <TextField
                fullWidth
                name='email'
                label='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
                fullWidth
                name='password'
                label='Mật khẩu'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched?.password && Boolean(formik.errors?.password)}
                helperText={formik.touched?.password && formik.errors?.password}
            />

        </div>
    )
}

export default BecomeSellerFormStep4
