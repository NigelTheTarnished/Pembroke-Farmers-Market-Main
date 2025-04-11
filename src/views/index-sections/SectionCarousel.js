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
  Card,
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

// core components

const items = [
  {
    src: require("assets/img/tim-marshall.jpg"),
    altText: "Support Local Farmers & Artisans - Every purchase supports small businesses right here in our community. ",
    caption: "Support Local Farmers & Artisans - Every purchase supports small businesses right here in our community. ",
  },
  {
    src: require("assets/img/bike-green.jpg"),
    altText: "Somewhere else",
    caption: "Peaceful day",
  },
  {
    src: require("assets/img/blue-truck.jpg"),
    altText: "Here it is",
    caption: "Wonderful nature",
  },
];

function SectionCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  return (
    <>
      <div className="section pt-o" id="carousel" style={{ padding: "0.5rem" }}>
        <Card className="page-carousel" style={{ 
          margin: "0 auto", 
          maxWidth: "1800px",
          height: "calc(105vh - 2rem)"
        }}>
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
          >
            <CarouselIndicators
              items={items}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            {items.map((item) => {
              return (
                <CarouselItem
                  onExiting={onExiting}
                  onExited={onExited}
                  key={item.src}
                >
                  <img 
                    src={item.src} 
                    alt={item.altText} 
                    style={{ 
                      height: "calc(105vh - 2rem)",
                      objectFit: "cover",
                      width: "100%"
                    }}
                  />
                  <CarouselCaption
                    captionText={item.caption}
                    captionHeader=""
                  />
                </CarouselItem>
              );
            })}
            <a
              className="left carousel-control carousel-control-prev"
              data-slide="prev"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                previous();
              }}
              role="button"
            >
              <span className="fa fa-angle-left" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="right carousel-control carousel-control-next"
              data-slide="next"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                next();
              }}
              role="button"
            >
              <span className="fa fa-angle-right" />
              <span className="sr-only">Next</span>
            </a>
          </Carousel>
        </Card>
      </div>{" "}
    </>
  );
}

export default SectionCarousel;
