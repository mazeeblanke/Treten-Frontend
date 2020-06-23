import React from 'react'
import PropTypes from 'prop-types'
const { paystackFormApiKey } = require('../../lib/config')
// const Cookies = require('js-cookie')

const PaystackForm = (props) => {
    const {
        user,
        price,
        amount,
        courseId,
        invoiceId,
        description,
        courseBatchId,
        availableDate,
        transactionId
    } = props
    return (
        <>
            {/* <input type="hidden" name="_token" id="csrf-token" value={Cookies.get('XSRF-TOKEN')} /> */}
            <input type="hidden" name="email" value={user.email || ''} />
            <input type="hidden" name="orderID" value={invoiceId || ''} />
            <input type="hidden" name="amount" value={price * 100} />
            <input type="hidden" name="quantity" value="1" />
            <input type="hidden" name="metadata" value={JSON.stringify({
              amount,
              courseId,
              invoiceId,
              description,
              transactionId,
              availableDate,
              courseBatchId,
              userId: user && user.id,
            })} />
            <input
              type="hidden"
              name="reference"
              value={transactionId || ''}
            />
            <input
              type="hidden"
              name="key"
              value={paystackFormApiKey}
            /> 
        </>
    )
}

PaystackForm.propTypes = {
    user: PropTypes.object,
    price: PropTypes.number,
    amount: PropTypes.number,
    courseId: PropTypes.number,
    invoiceId: PropTypes.string,
    description: PropTypes.string,
    courseBatchId: PropTypes.number,
    availableDate: PropTypes.string,
    transactionId: PropTypes.string
}

export default PaystackForm;
