/*!

=========================================================
* Paper Kit React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function IndexHeader() {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/greenforce.jpg") + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 
                className="presentation-title"
                style={{
                  transform: `translateY(${scrollY * 0.5}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                Fresh. Local. Community.
              </h1>
             {/* <div className="fog-low">
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div>
              <div className="fog-low right">
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div>*/}
            </div>
            <h2 
              className="presentation-subtitle text-center"
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              The Pembroke Farmers Market is your go-to destination for farm-fresh produce, locally raised meats, homemade baked goods, handcrafted artisan items, and so much more! Whether you're looking for seasonal fruits & vegetables, unique handmade products, or a friendly community atmosphere, you'll find it all at the market.
            </h2>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("assets/img/clouds.png") + ")",
          }}
        />
        
      </div>
    </>
  );
}

export default IndexHeader;
