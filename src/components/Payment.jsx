import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log(values);
        navigate('/confirmation');
    };

    return (
        <div>
            <h1>Payment</h1>
            <Formik
                initialValues={{ cardNumber: '', expiryDate: '', cvv: '' }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label>Card Number</label>
                        <Field name="cardNumber" type="text" />
                    </div>
                    <div>
                        <label>Expiry Date</label>
                        <Field name="expiryDate" type="text" />
                    </div>
                    <div>
                        <label>CVV</label>
                        <Field name="cvv" type="text" />
                    </div>
                    <button type="submit">Submit Payment</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Payment;
