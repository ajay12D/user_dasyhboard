import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Checkout } from "./checkout";


const initialOptions = {
     "client-id": "AXdin7tKqsoU4ktn8xc_nmEWJIkDQCC1CbpX4p_wFfbScF9_uUTlR5Z_QL5Wx2J63sVujAXfxQ3GZzDl",
      currency: "USD",
       intent: "capture",
};


export function ThePayPalSripter(){
    
      return (
        <PayPalScriptProvider options = {initialOptions}>
            <Checkout />
        </PayPalScriptProvider>
      )
}


export default ThePayPalSripter;