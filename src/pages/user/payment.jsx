import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from '../../api/Stripe'
import useAwirutStore from '../../store/AwirutStore'
import CheckoutForm from "../../components/CheckoutFrom";

const stripePromise = loadStripe("pk_test_51QsHjyCkGoJKYmi2m8oEwfCt2OiLjCJIXHaV0JZBSDbhJknNOcafteH3sfx9sOMDl8h1ImX0pbpQqAdF54Y3dbgt00v8yQw1q9")


const Payment = () => {
  const token = useAwirutStore((s) => s.token)
  const [clientSecret, setClientSecret] = useState("");

  // console.log(token)

  useEffect(() => {
    payment(token)
      .then((res) => {
        console.log('res', res)
        setClientSecret(res.data.clientSecret)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <div>
      {
        clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )
      }
    </div>
  )
}

export default Payment
