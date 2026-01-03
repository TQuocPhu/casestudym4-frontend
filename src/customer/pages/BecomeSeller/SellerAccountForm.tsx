import { Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { useState, useEffect } from 'react'
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import { useFormik } from 'formik';
import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';

const steps = [
    "Tax Detail & Phone",
    "Pickup Address",
    "Bank Detail",
    "Supplier Detail",
];



const SellerAccountForm = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleStep = (value: number) => {

        (activeStep < steps.length - 1 || (activeStep > 0 && value === -1)) && setActiveStep(activeStep + value)
        // setActiveStep(prev => prev + value);
        activeStep === steps.length - 1 && handleCreateAccount();
        console.log("active step: ", activeStep)
    }

    useEffect(() => {
        console.log("Active step changed:", activeStep);
    }, [activeStep]);

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handleCreateAccount();
        } else {
            setActiveStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };


    const handleCreateAccount = () => {
        console.log("create Account");
    }

    const formik = useFormik({
        initialValues: {
            mobile: "",
            otp: "",
            tin: "",
            pickupAddress: {
                name: "",
                mobile: "",
                pinCode: "",
                address: "",
                locality: "",
                city: "",
                state: "",
            },
            bankDetail: {
                accountNumber: "",
                accountHolderName: "",
                bankName: "",
            },
            sellerName: "",
            email: "",
            businessDetail: {
                businessName: "",
                businessEmail: "",
                businessMobile: "",
                businessAddress: "",
                logo: "",
                banner: "",
            },
            password: "",
        },
        onSubmit: (values) => {
            console.log(values, "formik submitted")
            console.log("active step ", activeStep);
        }
    })


    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>

                {
                    steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))
                }

            </Stepper>

            <section className='mt-20 space-y-10'>
                <div>
                    {activeStep === 0 ? <BecomeSellerFormStep1 formik={formik} /> :
                        activeStep === 1 ? <BecomeSellerFormStep2 formik={formik} /> :
                            activeStep === 2 ? <BecomeSellerFormStep3 formik={formik} /> :
                                activeStep === 3 ? <BecomeSellerFormStep4 formik={formik} /> : ""}

                </div>

                <div className='flex items-center justify-between'>
                    <Button
                        onClick={handleBack}
                        variant='contained' disabled={activeStep === 0}>
                        Back
                    </Button>

                    <Button
                        onClick={handleNext}
                        variant="contained"
                    >
                        {activeStep === (steps.length - 1) ? "Create Account" : "Next"}

                    </Button>
                </div>
            </section>
        </div>
    )
}

export default SellerAccountForm
