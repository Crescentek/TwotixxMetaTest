import React, { useLayoutEffect } from "react";
import "./terms.css"
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router-dom";

function Terms() {

  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="terms-service-main">
      <Navbar/>
        <div className="terms-service-block">
            <h2 style={{color: 'var(--Primary-Mid-Blue)'}}>Terms of Service</h2>
            <div className="terms-service-inner">
              <div className="terms-service-inner-lft">

                  <div className="terms-service-item">
                    <h3>Introduction</h3>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>1.1</h4></div>
                        <div className="terms-service-item-rht">
                          <p>By using this website, you agree to comply with and be bound by these terms and conditions.</p>
                        </div>
                    </div>
                  </div>

                  <div className="terms-service-item">
                    <h3>Ticket Purchase</h3>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>2.1</h4></div>
                        <div className="terms-service-item-rht">
                          <p>This website facilitates the sale of tickets by event organisers.</p>
                        </div>
                    </div>

                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>2.2</h4></div>
                        <div className="terms-service-item-rht">
                          <p>All tickets are sold by the respective event organisers, and this platform acts as a facilitator for the transaction.</p>
                        </div>
                    </div>
                  </div>

                  <div className="terms-service-item">
                    <h3>Ticket Delivery</h3>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>3.1</h4></div>
                        <div className="terms-service-item-rht">
                          <p>Tickets purchased through this website will be delivered to the Twotixx Mobile App.</p>
                        </div>
                    </div>

                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>3.2</h4></div>
                        <div className="terms-service-item-rht">
                          <p>The Twotixx Mobile App is the designated platform for accessing and storing your event tickets.</p>
                        </div>
                    </div>
                  </div>

                  <div className="terms-service-item">
                    <h3>Organiser Responsibility</h3>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>4.1</h4></div>
                        <div className="terms-service-item-rht">
                          <p>Event organisers are solely responsible for the content and pricing, and the event itself.</p>
                        </div>
                    </div>

                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>4.2</h4></div>
                        <div className="terms-service-item-rht">
                          <p>Any issues related to the event or tickets should be addressed directly with the event organiser.</p>
                        </div>
                    </div>
                  </div>


                  <div className="terms-service-item">
                    <h3>Refund Policy</h3>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>5.1</h4></div>
                        <div className="terms-service-item-rht">
                          <p>The refund policy for tickets is determined by the event organiser.</p>
                        </div>
                    </div>

                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>5.2</h4></div>
                        <div className="terms-service-item-rht">
                          <p>For refund inquiries, users should contact the event organiser directly using the provided contact information.</p>
                        </div>
                    </div>
                  </div>


                  <div className="terms-service-item">
                    <h3>Payments & Refunds</h3>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>6.1</h4></div>
                        <div className="terms-service-item-rht">
                          <p>Payments are processed securely through this website.</p>
                        </div>
                    </div>
                  </div>


                  <div className="terms-service-item">
                    <h3>Accuracy of Information</h3>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>7.1</h4></div>
                        <div className="terms-service-item-rht">
                          <p>We strive to provide accurate event information; however,
                             we do not guarantee the accuracy of details provided by event organisers.</p>
                        </div>
                    </div>
                  </div>


                  <div className="terms-service-item">
                    <h3>Intellectual Property</h3>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>8.1</h4></div>
                        <div className="terms-service-item-rht">
                          <p>All content on this website, including logos and trademarks, is the property of the respective owners.</p>
                        </div>
                    </div>
                  </div>


                  <div className="terms-service-item">
                    <h3>User Responsibilities</h3>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>9.1</h4></div>
                        <div className="terms-service-item-rht">
                          <p>Users must provide accurate and truthful information during the ticket purchase process.</p>
                        </div>
                    </div>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>9.2</h4></div>
                        <div className="terms-service-item-rht">
                          <p>Users are responsible for keeping their account information and passwords secure.</p>
                        </div>
                    </div>
                  </div>


                  <div className="terms-service-item">
                    <h3>Prohibited Activities</h3>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>10.1</h4></div>
                        <div className="terms-service-item-rht">
                          <p>Users must not engage in any fraudulent or illegal activities on this website.</p>
                        </div>
                    </div>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>10.2</h4></div>
                        <div className="terms-service-item-rht">
                          <p>Any violation of these terms may result in the termination of your account.</p>
                        </div>
                    </div>
                  </div>


                  <div className="terms-service-item">
                    <h3>Limitation of Liability</h3>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>11.1</h4></div>
                        <div className="terms-service-item-rht">
                          <p>We are not liable for any direct, indirect, incidental, or consequential damages
                             arising out of the use of this website.</p>
                        </div>
                    </div>                   
                  </div>

                  <div className="terms-service-item">
                    <h3>Termination</h3>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>12.1</h4></div>
                        <div className="terms-service-item-rht">
                          <p>We reserve the right to terminate or suspend your account at our discretion.</p>
                        </div>
                    </div>                   
                  </div>

                  <div className="terms-service-item">
                    <h3>Changes to Terms</h3>
                    <div className="terms-service-item-inner">
                        <div className="terms-service-item-lft"><h4>13.1</h4></div>
                        <div className="terms-service-item-rht">
                          <p>These terms may be updated from time to time. Users are responsible
                             for reviewing the terms periodically.</p>
                        </div>
                    </div>                   
                  </div>

                  <div className="termBottom-content">
                    <p>By using this website, you acknowledge that you have read, understood,
                       and agree to be bound by these terms and conditions. If you do not agree, 
                       please do not use this website.</p>
                  </div>

              </div>
              <div className="terms-service-inner-rht">
                    <img className="terms-service-img" alt="" src="/term-service-img.svg" />
              </div>
            </div>
        </div>
      <Footer/>
    </div>
  );
}

export default Terms;
