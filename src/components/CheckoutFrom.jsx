import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import '../stripe.css'
import { SaveOrder } from "../api/User";
import useAwirutStore from "../store/AwirutStore";
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

export default function CheckoutForm() {
    const navigate = useNavigate()

    const token = useAwirutStore((s) => s.token)
    const clearCart = useAwirutStore((s) => s.clearCart)

    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const payload = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        });

        console.log('payload', payload)
        if (payload.error) {
            setMessage(payload.error.message);
            toast.error(payload.error.message)
        }
        else if (payload.paymentIntent.status === 'succeeded') {
            console.log('Ready or Saveorder')
            SaveOrder(token, payload)
                .then((res) => {
                    console.log(res)
                    toast.success('Save Order Success')
                    clearCart()
                    navigate('/user/history')
                })
                .catch((err) => {
                    console.log(err)
                })
            console.log('Awirut', payload)
        }
        else {
            // console.log('Some thing wrong!!!')
            toast.warning('Some thing wrong!!!')
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    return (
        <form
            className="space-y-6"
            id="payment-form" onSubmit={handleSubmit}>

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button
                className="stripe-button"
                disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}