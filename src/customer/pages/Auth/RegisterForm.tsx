import React from 'react'
import { useFormik } from 'formik'
import { useAppDispatch } from '../../../State/Store';
import { Button, TextField } from '@mui/material';
import { sendLoginSignupOtp } from '../../../State/AuthSlice';

const RegisterForm = () => {

    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            otp: "",
            fullName: "",
        },
        onSubmit: (values) => {
            console.log("Form data ", values)

        }
    })

    const handleSendOtp = () => {
        dispatch(sendLoginSignupOtp({ email: formik.values.email }))
    }
    return (
        <div>
            <h1 className='text-center text-primary-color text-2xl mt-5 font-bold pb-8'>Signup</h1>

            <div className='space-y-5'>

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

                {true &&
                    <div className='space-y-5'>
                        <div className='space-y-2'>
                            <p className='font-medium text-sm opacity-60'>Nhập mã OTP được gửi đến email của bạn</p>
                            <TextField
                                fullWidth
                                name='otp'
                                label='OTP'
                                value={formik.values.otp}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.otp && Boolean(formik.errors.otp)}
                                helperText={formik.touched.otp && formik.errors.otp}
                            />
                        </div>

                        <TextField
                            fullWidth
                            name='fullName'
                            label='Họ tên'
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                            helperText={formik.touched.fullName && formik.errors.fullName}
                        />
                    </div>
                }

                {false && <Button onClick={handleSendOtp} fullWidth variant='contained' sx={{ py: "12px" }}>
                    Send Otp
                </Button>}

                <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{ py: "12px" }}>
                    SIGNUP
                </Button>

            </div>
        </div>
    )
}

export default RegisterForm
