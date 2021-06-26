import React from 'react'

export default function CheckoutSteps(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? "active-step" : ""}>Sign In</div>
            <div className={props.step2 ? "active-step" : ""}>Shipping</div>
            {/* <div className={props.step3 ? "active-step" : ""}>Place Order</div> */}
            <div className={props.step4 ? "active-step" : ""}>Payment</div>
        </div>
    );
}
