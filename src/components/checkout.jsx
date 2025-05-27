
import React, {useState} from "react";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRecoilValue } from "recoil";
import { admimAtom } from "../store/atoms/admin_atom";

export const Checkout = () => {
    const [ {options, isPending}, dispatch] = usePayPalScriptReducer();
    const [ currency, setCurrency] = useState(options.currency);
    const adminEmail = useRecoilValue(admimAtom);
    
    

    function svaingDetails(d){
     const res = axios.post("http://localhost:3000/api/payment_details",{
         email: admimAtom,
         payment_id:d.id,
         status: d.status
     })
    }

     const onCurrencyChange  = ({ target: { value}}) => {
        setCurrency(value);
        dispatch ({
            type: "resetOptions",
            value: {
                ...options,
                currency: value
            },
        });
     }

     const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                   amount: {
                     value: "9.00",
                     currency_code: currency
                   },
                },
            ],  
        });
    };
    
    const onApproveOrder = async (data, actions) => {
        try {
          const details = await actions.order.capture();
          const name = details.payer.name.given_name;
          console.log('payment detail is ', details);
          alert(`Transaction completed by ${name}`);
          svaingDetails(details);
        } catch (err) {
          console.error("Capture failed", err);
          alert("Something went wrong during capture.");
        }
      };
      


     return (
        <div>
            {isPending ? <p>LOADING...</p> : (
                <>
                  <select value = {currency} onChange = {onCurrencyChange}>
                          <option value = "USD">USD</option>
                          <option value = "EUR">EUR</option>
                  </select>
                  <PayPalButtons 
                   style = {{layout: "vertical"}}
                   createOrder={(data, actions) => onCreateOrder(data, actions)}
                   onApprove={(data, actions) => onApproveOrder(data,actions)}
                   forceReRender={[currency]} />
                </>
            )}
        </div>
     );
}

 


