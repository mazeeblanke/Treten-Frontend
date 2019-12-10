import React, { Component } from 'react'
import { connect } from 'react-redux'
import withMasterLayout from './layouts/withMasterLayout'
import Footer from '../components/shared/Footer'
import * as actions from '../store/actions'

class Policies extends Component {
  static async getInitialProps () {
    return {}
  }

  render () {
    return (
      <>
        <section className="policies">
          <div className="container pt-6">
            <div className="row justify-content-center">
              <div className="col-sm-12 has-border-radius-20 pb-3">
                <h3 className="policies-extra__main-text text-center mt-2 mb-2">Policies</h3>
              </div>
              <div className="col-sm-8 pl-4 lh-30 pr-4 mb-7">
                <div className="row">
                  <div className="col-lg-12  partner-listing-header">
                    <p className="content-text">The following policy describes the information gathering and dissemination practices for the Treten Academy website (www.tretenacademy.com), all sites in the tretenacademy.com domain, and all sites in the Treten networks Limited.</p>
                  </div>
                </div>
                <div className="partner-listing-main">
                  <div className="tos-item">
                    <h3 className="info-course__title">Information Gathering</h3>
                    <p>Treten Academy logs server information to identify: (1) usage levels of specific areas of our site, (2) origin of our site&rsquo;s audience, and (3) browsers and operating systems of site visitors. We do not associate IP addresses to individuals. As such, visitor sessions will be tracked, but visitors will remain anonymous</p>
                    <p>The following information may be collected for this analysis, including, but not limited to:</p>
                    <p className="info-course__item"><strong>User client hostname &ndash;</strong>&nbsp;The hostname (or IP address if DNS is disabled) of the user/client requesting access.</p>
                    <p className="info-course__item"><strong>HTTP header, &ldquo;user-agent&rdquo; &ndash;&nbsp;</strong>The user-agent information includes the type of browser, its version, and the operating system it is running on.</p>
                    <p className="info-course__item"><strong>HTTP header, &ldquo;referrer&rdquo; &ndash;&nbsp;</strong>The referrer specifies the page from which the client accessed the current page.</p>
                    <p className="info-course__item"><strong>System date &ndash;&nbsp;</strong>The date and time of the user/client request.</p>
                    <p className="info-course__item"><strong>Full request &ndash;&nbsp;</strong>The exact request the user/client made.</p>
                    <p className="info-course__item"><strong>Status &ndash;&nbsp;</strong>The status code the server returned to the user/client.</p>
                    <p className="info-course__item"><strong>Content length &ndash;&nbsp;</strong>The content length, in bytes, of the document sent to the user/client.</p>
                    <p className="info-course__item"><strong>Method &ndash;&nbsp;</strong>The request method used.</p>
                    <p className="info-course__item"><strong>Universal Resource Locator (URL) &ndash;&nbsp;</strong>The location of a resource on the server.</p>
                    <p className="info-course__item"><strong>Query string of the URL &ndash;&nbsp;</strong>Anything after the question mark in a URL.</p>
                    <p className="info-course__item"><strong>Protocol &ndash;&nbsp;</strong>The transport protocol and version used.</p>
                    <p>Other than information voluntarily provided by visitors, Treten Academy does not collect personally identifiable information (such as name, email, or address). Treten Academy employs cookies, tracking pixels and related technologies for marketing purposes. Cookies are small data files that are stored on your device. Our site uses cookies dropped by us or third parties for marketing and personalization. Also, cookies may be used to track how you use the site to target ads to you on other websites.</p>
                  </div>
                  <hr />
                  <div className="tos-item">
                    <h3 className="info-course__title">Information Provided Voluntarily</h3>
                    <p>When using the Treten Academy website, you may choose to provide information to us through web forms, email, or other electronic means. Any personally identifiable information you submit will be used only for the purpose(s) indicated. Requests for information will be directed to the appropriate staff and may be recorded to help us improve our site and better respond to similar requests.</p>
                  </div>
                  <hr />
                  <div className="tos-item">
                    <h3 className="info-course__title">Use of Information</h3>
                    <p>Treten Academy uses the information described above to tailor content to visitors, ensure broad access to our site regardless of software, monitor site performance, and generate aggregate statistical reports. At no time do we disclose site usage by individual IP addresses</p>
                    <p>Treten Academy will not sell, exchange, or otherwise distribute your personally identifiable information without your consent, except to the extent required by law. Each web page requesting information discloses the purpose of that information. Persons not wishing to have submitted information used in that manner are not required to provide it.</p>
                  </div>
                  <hr />
                  <div className="tos-item">
                    <h3 className="info-course__title">Security</h3>
                    <p>This site has security measures in place to protect against loss, misuse, or alteration of data collected. Treten Academy website is expected to adopt security measures appropriate for Treten Academy&rsquo;s data collection practices.</p>
                  </div>
                  <hr />
                  <div className="tos-item">
                    <h3 className="info-course__title">External Links</h3>
                    <p>Treten Academy contains links to sites outside the tretenacademy.com domain. We are not responsible for the privacy practices of these websites.</p>
                    <p>For more information on this policy or to buy or register for a course by phone, call&nbsp;<strong>+2348039093635</strong></p>
                  </div>
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
)(withMasterLayout(Policies))
