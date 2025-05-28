
import React, {useState} from "react";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRecoilState, useRecoilValue } from "recoil";
import { admimAtom, statusAtom } from "../store/atoms/admin_atom.js";
import axios from "axios";

export const Checkout = () => {
    const [ {options, isPending}, dispatch] = usePayPalScriptReducer();
    const [ currency, setCurrency] = useState(options.currency);
    const adminEmail = useRecoilValue(admimAtom);
    const value = '9.00';
    


    const [status, setStatus] = useRecoilState(statusAtom)
    
    

   async  function svaingDetails(d){
     const res = await axios.post("http://localhost:3000/api/payment_detalis",{
         email: adminEmail,
         payment_id:d.id,
         value: value,
         status: d.status
     });
      if(res){
        console.log(res.data)
      }
    
      
      if(res?.data?.payment?.status === "COMPLETED"){

        setStatus(true);
      }

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
                     value: value,
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
          svaingDetails(details);
          alert(`Transaction completed by ${name}`);
          
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

 


