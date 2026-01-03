import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"

// const validationAddressFormSchema = Yup.object().shape({
//     name: Yup.string()
//         .min(2, "Tên quá ngắn")
//         .required("Vui lòng nhập họ và tên"),
//     mobile: Yup.string()
//         .matches(/^(0|84)(3|5|7|8|9)([0-9]{8})$/, "Số điện thoại không hợp lệ")
//         .required("Vui lòng nhập số điện thoại"),
//     pinCode: Yup.string()
//         .matches(/^[0-9]{5,6}$/, "Mã bưu chính phải có 5 hoặc 6 chữ số")
//         .required("Vui lòng nhập mã bưu chính"),
//     address: Yup.string()
//         .required("Vui lòng nhập địa chỉ cụ thể"),
//     city: Yup.string()
//         .required("Vui lòng nhập tỉnh/thành phố"),
//     state: Yup.string()
//         .required("Vui lòng nhập số nhà/tên đường"),
//     locality: Yup.string()
//         .required("Vui lòng nhập phường/xã/quận/huyện"),
// })

const BecomeSellerFormStep2 = ({ formik }: any) => {

    return (
        <Box>
            <>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name='name'
                            label="Họ và Tên"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
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
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            name='pinCode'
                            label="Mã bưu chính"
                            value={formik.values.pinCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                            helperText={formik.touched.pinCode && formik.errors.pinCode}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name='address'
                            label="Địa chỉ"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            name='city'
                            label="Thành phố"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            name='state'
                            label="Số nhà"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name='locality'
                            label="Khu vực"
                            value={formik.values.locality}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.locality && Boolean(formik.errors.locality)}
                            helperText={formik.touched.locality && formik.errors.locality}
                        />
                    </Grid>

                </Grid>
            </>
        </Box>
    )
}

export default BecomeSellerFormStep2
