import React, { Component } from 'react'
import { connect } from 'react-redux'
import withMasterLayout from './layouts/withMasterLayout'
import Footer from '../components/shared/Footer'
import * as actions from '../store/actions'

class TermsAndConditions extends Component {
  render () {
    return (
      <>
        <section className="termsandconditions">
          <div className="container pt-6">
            <div className="row justify-content-center">
              <div className="col-sm-12 has-border-radius-20 pb-3">
                <h3 className="termsandconditions-extra__main-text text-center mt-2 mb-2">
                  Terms and Conditions
                </h3>
              </div>
              <div className="col-sm-8 pl-4 lh-30 pr-4 mb-7">
                <div className="row">
                  <div className="">
                    <p className="content-text">Below are our terms and conditions and we encourage you to read and understand them.</p>
                  </div>
                </div>
                <div className="tos-item">
                  <h3 className="info-course__title">Acceptance</h3>
                  <p>YOU ACCEPT AND AGREE TO BE BOUND BY THE TERMS OF THIS AGREEMENT BY ENROLLING, SUBSCRIBING, VIEWING, OR USING THE COURSE MATERIALS. YOU MUST AGREE TO THE TERMS OF THIS AGREEMENT BEFORE YOU WILL BE ALLOWED TO ATTEND CLASS, USE THE COURSE MATERIALS. IF YOU DO NOT AGREE TO THE TERMS OF THIS AGREEMENT, YOU MUST CEASE ATTENDING ANY CLASSES AND DISCONTINUE USE OF COURSE MATERIALS</p>
                </div>
                <hr />
                <div className="tos-item">
                  <h3 className="info-course__title">Restrictions on Transfer</h3>
                  <p>Without first obtaining the express written consent of Treten Academy, you may not assign your rights and obligations under this Agreement, or redistribute, share, encumber, sell, rent, lease, sublicense, or transfer your rights of attending the classes and accessing the course materials.</p>
                </div>
                <hr />
                <div className="tos-item">
                  <h3 className="info-course__title">Restrictions on Alteration</h3>
                  <p>You may not modify the course materials or create any derivative work of the course materials or its accompanying documentation. Derivative works include, but are not limited to, translations. You may not alter any files that may be downloaded because of accessing the course materials. This Agreement does not permit the sharing or use of Treten Academy materials in a classroom setting or otherwise.</p>
                </div>
                <hr />
                <div className="tos-item">
                  <h3 className="info-course__title">Course Cancellation Policy</h3>
                  <p>Refunds for instructor-led and live online classes are not permitted for any reason. If you no longer wish to attend an instructor-led or live online class, you must notify Treten Academy in writing at least 7 days before the course start date. You are then eligible to receive a learning credit equivalent to the course fee paid that you may apply to another course enrolment. Learning credit expires 180 calendar days from issue date and is not transferable.</p>
                  <p>If for any reason, you need to reschedule a class you have enrolled, or if you would like to choose a different start date after enrolment, you must notify Treten Academy in writing at least 7 days before the class start date. At Treten Academy&rsquo;s sole discretion, you may incur a rescheduling fee if your request is placed less than 7 days before the original class start date. Rescheduling fees are based on current class list price and must be paid before you may attend.</p>
                  <p>Rescheduling 7 days or more in advance will not incur a rescheduling fee.Rescheduling less than 7 days in advance will incur a 10% of the course fees as rescheduling fee. Failure to attend your scheduled class without prior written notification will be considered a &ldquo;no show&rdquo; and the course fee paid will be forfeited.</p>
                  <p>Treten Academy reserves the right to cancel or reschedule any class with a notice of 15 days prior to the start date to enrolled participants. Treten Academy shall not be liable for lost travel expenses or any other expense incurred by the student related to a rescheduled class.&ensp;Treten Academy assumes no liability in the case of war (declared or undeclared), natural or man-made disasters, delays or inability to travel, or other forces outside of Treten Academy&rsquo;s control through which Treten Academy determines attending a class may cause risk to students or Treten Academy employees.</p>
                </div>
                <div className="tos-item">&nbsp;</div>
                <div className="tos-item">
                  <h3 className="info-course__title">Course Payment Policies</h3>
                  <p>Before one can reserve a seat in an upcoming classroom and live online class, an email confirmation order willing to enroll must be placed and subsequently the course fees paid either full or initial amount as per payment plan.</p>
                  <p>Class rescheduling fee will apply regardless of the payment method selected. Please refer to the rescheduling policy for further details.</p>
                  <p>If a visa invitation letter from Treten Academy is required to attend your scheduled on-site classes, please plan your payment accordingly. Class orders must be paid in full before we are able to issue visa invitation letters to students.</p>
                </div>
                <hr />
                <div className="tos-item">
                  <h3 className="info-course__title">Course Re-Take Policy</h3>
                  <p>The retake terms in place at the time of enrolment will apply to your case. Re-takes are available for classes of the same type, or for classes that have replaced the course you originally attended. You must attend your initial class before you can register for a re-take. You may only register for one retake at a time and must attend the retake session before scheduling another re-take. Students may schedule a re-take for any upcoming class date, excluding those marked &ldquo;Sold Out&rdquo;. Any outstanding fees, including rescheduling fees, must be paid before you can register for a re-take. 3 re-takes of the same class type are permitted within 12 months from the date of first enrolment. Re-take policy is subject to change at any time at the discretion of Treten Academy.</p>
                </div>
                <hr />
                <div className="tos-item">
                  <h3 className="info-course__title">Payment Plans General Overview</h3>
                  <p>Course Fees totally less than N100,000 must be paid in full 7 days prior to the class start date. Any amount of Treten Academy offered courses totaling N100,000 or more is eligible for an instalment-based payment plan. Any course fee which contains discounted or promotional pricing is not eligible for payment plan processing unless specified by the billing department. A processing fee will be applied to all payment plan orders calculated at 5% of your order total. This 5% fee will be processed with the first payment. A minimum of 30% of the order total is required as the initial payment (+5% processing fee). The remaining balance will be spread over the remaining term, not to exceed a total of three months. This is not a credit or financing plan and no interest charges are incurred from Treten Academy, except for the initial 5% processing fee.</p>
                  <p><strong>Example:&nbsp;</strong>You have enrolled for a course with fees of NGN 150000 and have opted for a 3-month payment plan. You must pay NGN 45000 NGN for your initial payment, plus the 5% processing fee of NGN 7500 at the time of enrolment. Your first payment would be NGN 52500. The remaining NGN 105000 course fee balance will have to be paid the next 3 months, at NGN 35000 per month. If you have enrolled within regular business hours, our Sales Department will contact you by end of day to gather payment information. Sales team will inform you via email on the course schedule after the first payment is complete. You may also contact us for immediate response at +234 8039093635.</p>
                </div>
                <hr />
                <div className="tos-item">
                  <h3 className="info-course__title">Guidelines &amp; Restrictions</h3>
                  <p><strong>Course Fees:&nbsp;</strong>Your course fees total must amount to NGN 100000 or more to qualify for a Payment Plan.</p>
                  <p><strong>Term Length:&nbsp;</strong>Available Payment Plan terms are 2 and 3-month instalments.</p>
                  <p><strong>Payment method:&nbsp;</strong>Payment Plan purchases must be made by credit card, debit card, Bank Transfer, Cheque or DD. No other payment methods are accepted for payment plan orders.</p>
                  <p><strong>Initial down payment:&nbsp;</strong>All Payment Plans must begin with at least a 25% down payment plus 5% processing fee. Any exceptions are at the sole discretion of our billing team.</p>
                </div>
                <hr />
                <div className="tos-item">
                  <h3 className="info-course__title">Payment Failures and Non-Payment Policy</h3>
                  <p>If you fail to pay the instalment for any reason, you will be contacted by our billing department via email. You will have 5 days from that day to respond to the email and pay the outstanding instalment payment with our billing team. If, on 5th business day following the failed payment, we have not heard from you nor have arrangements been made to process the payment using another method, your account will go into default and will be suspended from taking any further classes. To re-join the classes, your remaining balance must be paid in full. If your payments have lapsed more than 90 days, a NGN 5000 reinstatement fee will apply (along with your remaining payment balance) to re-join the classes. If your payments have lapsed more than 365 calendar days, your enrolment to the class will be permanently cancelled and all monies paid will be forfeited. Treten Academy also may report any unpaid order balance to a debt collection agency.</p>
                </div>
                <hr />
                <div className="tos-item">
                  <h3 className="info-course__title">Price Changes and Refunds</h3>
                  <p>Course pricing is subject to change without notice. If there is a price drop within 48 hours of your enrolment, you may request a learning credit for the price difference, provided your purchase was made at full price. This offer does not apply to any special deals, promotions or discounts you may have already received. This learning credit is non-transferable and expires 180 days from the date of the original purchase.</p>
                  <p><strong>All course enrolments are final and non-refundable</strong></p>
                </div>
                <hr />
                <div className="tos-item">
                  <h3 className="info-course__title">Learning Credit</h3>
                  <p>Learning credits may be issued in a variety of cases. For any class cancellation (upon approval from Sales team), price change credit, or other exchanging purposes, learning credits will be issued and will be valid for 180 days from the issue date. Learning credits can be redeemed for any of the Treten Academy offered courses. After 180 days, the credit will be void. Learning credits may not be transferred nor converted into a cash refund under any circumstance.</p>
                </div>
                <hr />
                <div className="tos-item">
                  <h3 className="info-course__title">Promotional Offers</h3>
                  <p>Promotional offers may occasionally be available with specified purchases. Promotions cannot be combined with any other discounts, promotions or offers unless otherwise stated. The terms and conditions of any promotional offer are set out in the promotional material for such offer, which may vary from our standard terms and conditions, but remain subject to our End User License Agreement. Treten Academy reserves the right to discontinue promotions at any time. Please ask our sales team for details if you have questions about any promotion.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = () => ({
  // user: getUser(state),
})

export default connect(
  mapStateToProps,
  actions
)(withMasterLayout(TermsAndConditions))
