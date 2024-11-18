import React, { useEffect, useRef, useState } from "react";
import "../Seller.css";
import Slider from "react-slick";

const CombatingScams = () => {
  return (
    <div>
      <section className="combating-scams">
        <div className="combating-sec-topContent">
          <div className="combating-sec-topContent-lft">
            <h1>We’re combating</h1>
          </div>
          <div className="combating-sec-topContent-rht">
            <Slider
              autoplay
              autoplaySpeed={2000}
              dots={false}
              infinite
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              vertical
              verticalSwiping
              arrows={false}
            >
              <div>
                <h2>ticket fraud</h2>
              </div>
              <div>
                <h2>scams</h2>
              </div>
              <div>
                <h2>counterfeit</h2>
              </div>
              <div>
                <h2>touting</h2>
              </div>
            </Slider>
          </div>
        </div>

        <div className="combating-left-view">
          {/* <h1>We’re combating</h1> */}
          <div className="card">
            <img alt="" src="/contactIcons.svg" className="img-fluid" />
            <div className="card-title">High Demand Releases</div>
            <img alt="" src="/slider.svg" className="img-fluid" />
            <div className="card-text">
              For high-demand ticket releases, our queue system ensures a fair,
              bot-proof virtual waiting room. This solution guarantees a smooth
              ticketing experience, managing demand for optimal customer
              satisfaction.
            </div>
          </div>
        </div>
        <div className="combating-right-view">
          {/* <h1>ticket fraud scams</h1> */}
          {/* <div className="combating-sec-topContent-rht">
          <Slider
                autoplay
                autoplaySpeed={2000}
                dots={false}
                infinite
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                vertical
                verticalSwiping
                arrows={false}
              >
                <div>
                  <h2>ticket fraud</h2>
                </div>
                <div>
                  <h2>scams</h2>
                </div>
                <div>
                  <h2>counterfeit</h2>
                </div>
                <div>
                  <h2>touting</h2>
                </div>
              </Slider>
              </div> */}
          <div className="card">
            <img alt="" src="/block-screenshots.svg" className="img-fluid" />
            <div className="card-title">Blocked Screenshots</div>
            <img alt="" src="/slider.svg" className="img-fluid" />
            <div className="card-text">
              We prevent ticket screenshots to deter scams and unauthorised
              sharing, reducing fraud and counterfeiting risks. This ensures a
              secure and fair ticketing process for legitimate attendees.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CombatingScams;
