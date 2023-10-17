import React, { useEffect } from "react";
import Yoshi from "../../assets/yoshi-férias.jpg";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";

export default function Chats() {
  useEffect(() => {
    const el: any = document.getElementsByClassName(
      "mantine-2yup0d" || "mantine-UnstyledButton-root"
    );
    if (el.length > 0) {
      Array.from(el).forEach((element: any) => {
        element.style.backgroundColor = "#fff";
      });
    }
  }, []);
  return (
    <div className="bg-zinc-300 w-full h-[100vh] py-8">
      <Carousel
        withIndicators
        loop
        sx={{ maxWidth: 620 }}
        mx="auto"
        height={400}
        styles={{
          indicator: {
            display: "block",
            transition: "width 250ms ease",
            "&[aria-hidden]": {
              background: "rgb(255, 255, 255)",
            },
            "&[data-active]": {
              backgroundColor: "#ffffff",
            },
          },
        }}
      >
        <Carousel.Slide>
          <Image src={Yoshi} alt="" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src={Yoshi} alt="" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src={Yoshi} alt="" />
        </Carousel.Slide>
        {/* <Carousel.Slide>
          <Image className="bg-center bg-contain" src={Yoshi} alt="" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image className="bg-center bg-contain" src={Yoshi} alt="" />
        </Carousel.Slide> */}
      </Carousel>
    </div>
  );
}
//npm install embla-carousel-react @mantine/carousel
