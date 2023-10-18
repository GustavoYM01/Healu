import Yoshi from "../../assets/yoshi-férias.jpg";
import Dermelo1 from "../../assets/dermelo1.jpg";
import Dermelo2 from "../../assets/dermelo2.jpg";
import Dermelo3 from "../../assets/dermelo3.jpg";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import { useEffect } from "react";
import CarouselItem from "../CarouselItem/CarouselItem";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firebase } from "@/firebase/config";

export default function CarouselClinicas() {
  useEffect(() => {
    const el2: any = document.querySelector(".mantine-Carousel-indicators");
    const el: any = document.getElementsByClassName(
      "mantine-2yup0d" || "mantine-UnstyledButton-root"
    );
    if (el.length > 0 && el2) {
      Array.from(el).forEach((element: any) => {
        element.style.backgroundColor = "#fff";
      });
      el2.style.bottom = "-16px";
    }
  }, []);

  async function acessarDetalhesClinica(
    e: any,
    id: string,
    nomeClinica: string,
    especialidade: string,
    cidade: string,
    uf: string
  ) {
    e.stopPropagation();
    try {
      const req = await getDoc(doc(firebase.db, "clinica", id));
      if (req.exists()) location.href = `/clinica/${req.data().id}`;
      else {
        await setDoc(doc(firebase.db, "clinica", id), {
          id,
          nomeClinica,
          especialidade,
          cidade,
          estado: uf,
        })
          .then(async () => {
            const req = await getDoc(doc(firebase.db, "clinica", id));
            if (req.exists()) location.href = `/clinica/${req.data().id}`;
          })
          .catch((e: any) => console.log("ERRO: " + e));
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  }

  return (
    <div
      className="
    w-[calc(100%-240px)]
    absolute top-[6rem] left-[240px]
    "
    >
      <div
        className="
        relative
        w-[calc(100%-2rem)]
        rounded-md ml-[1rem]
        "
      >
        <Carousel
          withIndicators
          loop
          sx={{ maxWidth: "63rem" }}
          height={360}
          styles={{
            indicator: {
              display: "block",
              width: ".5rem",
              height: ".5rem",
              transition: "width 250ms ease",
              "&[aria-hidden]": {
                background: "rgb(210, 205, 205)",
              },
              "&[data-active]": {
                backgroundColor: "#2642D9",
              },
            },
            viewport: {
              borderRadius: ".5rem",
            },
          }}
        >
          <CarouselItem
            onClick={(e: any) =>
              acessarDetalhesClinica(
                e,
                "dermello",
                "Dermello - clínica dermatológica",
                "dermatologia",
                "São Paulo",
                "SP"
              )
            }
          >
            <Carousel.Slide className="relative">
              <div className="flex items-center justify-center">
                <Image className="max-w-[336px]" src={Dermelo1} alt="" />
                <Image className="max-w-[336px]" src={Dermelo2} alt="" />
                <Image className="max-w-[336px]" src={Dermelo3} alt="" />
              </div>
              <div
                className="
            absolute top-[80%] 
            w-[100%] py-5
            text-white
            bg-gradient-to-b from-[rgba(0,0,0,0.0)] to-[rgba(0,0,0,0.7)]
            "
              >
                <div
                  className="
              flex items-center justify-between
              px-4
              "
                >
                  <p className="font-medium text-2xl">
                    Dermello - clínica dermatológica
                  </p>
                  <span>São Paulo - SP</span>
                </div>
              </div>
            </Carousel.Slide>
          </CarouselItem>
          <CarouselItem
            onClick={(e: any) =>
              acessarDetalhesClinica(
                e,
                "dermello",
                "Dermello - clínica dermatológica",
                "dermatologia",
                "São Paulo",
                "SP"
              )
            }
          >
            <Carousel.Slide className="relative">
              <div className="flex items-center justify-center">
                <Image className="max-w-[336px]" src={Dermelo1} alt="" />
                <Image className="max-w-[336px]" src={Dermelo2} alt="" />
                <Image className="max-w-[336px]" src={Dermelo3} alt="" />
              </div>
              <div
                className="
            absolute top-[80%] 
            w-[100%] py-5
            text-white
            bg-gradient-to-b from-[rgba(0,0,0,0.0)] to-[rgba(0,0,0,0.7)]
            "
              >
                <div
                  className="
              flex items-center justify-between
              px-4
              "
                >
                  <p className="font-medium text-2xl">
                    Dermello - clínica dermatológica
                  </p>
                  <span>São Paulo - SP</span>
                </div>
              </div>
            </Carousel.Slide>
          </CarouselItem>
          <CarouselItem
            onClick={(e: any) =>
              acessarDetalhesClinica(
                e,
                "dermello",
                "Dermello - clínica dermatológica",
                "dermatologia",
                "São Paulo",
                "SP"
              )
            }
          >
            <Carousel.Slide className="relative">
              <div className="flex items-center justify-center">
                <Image className="max-w-[336px]" src={Dermelo1} alt="" />
                <Image className="max-w-[336px]" src={Dermelo2} alt="" />
                <Image className="max-w-[336px]" src={Dermelo3} alt="" />
              </div>
              <div
                className="
            absolute top-[80%] 
            w-[100%] py-5
            text-white
            bg-gradient-to-b from-[rgba(0,0,0,0.0)] to-[rgba(0,0,0,0.7)]
            "
              >
                <div
                  className="
              flex items-center justify-between
              px-4
              "
                >
                  <p className="font-medium text-2xl">
                    Dermello - clínica dermatológica
                  </p>
                  <span>São Paulo - SP</span>
                </div>
              </div>
            </Carousel.Slide>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
  );
}
