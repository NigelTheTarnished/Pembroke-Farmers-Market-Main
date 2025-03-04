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
import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

function SectionNucleoIcons() {
  const mapStyles = {
    height: "400px",
    width: "100%",
    borderRadius: "20px",
    overflow: "hidden"
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "20px",
    marginTop: "100px"
  };

  const marketLocation = {
    lat: 45.827504,
    lng: -77.1139491
  };

  return (
    <>
      <div className="section section-dark section-nucleo-icons">
        <Container>
          <Row>
            <Col lg="6" md="12">
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                padding: '30px',
                borderRadius: '10px'
              }}>
                <h2 className="title">Meet Us at the Market!</h2>
                <br />
                <h3> Come explore the best of Pembroke's local flavours and creativity! Grab a coffee, meet our amazing vendors and experience the joy of shopping fresh & local. </h3>
                <h3> Corner of Lake Street & Victoria Street, Pembroke, Ontario
                </h3>
                <h3>Market Days & Hours: Wednesdays & Saturdays 9 AM - 1 AM
                Rain or Shine! Thanks to our covered market space.
                </h3>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="icons-container" style={containerStyles}>
                <LoadScript 
                  googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                >
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={16}
                    center={marketLocation}
                  >
                    <Marker
                      position={marketLocation}
                      title="Pembroke Farmers' Market"
                    />
                  </GoogleMap>
                </LoadScript>
              </div>
            </Col>
          </Row>
        </Container>
      </div>{" "}
    </>
  );
}

export default SectionNucleoIcons;
