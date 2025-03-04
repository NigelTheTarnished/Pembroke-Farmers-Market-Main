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
import {
  Button,
  Container,
} from "reactstrap";

// core components

function SectionLogin() {
  return (
    <>
      <div
        className="section section-image section-login"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <Container>

              <div className="col text-center">
                <p>
                  Become a Vendor
                </p>
                <Button
                  className="btn-round"
                  outline
                  color="neutral"
                  href="/register-page"
                  size="lg"
                  target="_blank"
                >
                  Register Here
                </Button>
              </div>
           
          
        </Container>
      </div>{" "}
    </>
  );
}

export default SectionLogin;
