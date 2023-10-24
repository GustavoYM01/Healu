import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpiner from "../../../assets/loading-spinner.gif";
import Image from "next/image";
import Nutrife from "../../../assets/clinica-nutrife.jpg";
import Pedivida from "../../../assets/clinica-pedivida.jpg";
import Ortomove from "../../../assets/clinica-ortomove.jpg";
import Gynelogic from "../../../assets/clinica-gynelogic.jpg";
import DeMelo from "../../../assets/clinica-demelo.jpg";
import CardioExcel from "../../../assets/clinica-cardioexcel.jpg";
import Dermello from "../../../assets/dermelo2.jpg";
import DermelloBG from "../../../assets/dermelo-background.jpg";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { firebase } from "@/firebase/config";
import { verificarIdQuery } from "@/functions/verificarIdQuery";
import MenuLateral from "@/components/menuLateral/MenuLateral";
import Loading from "../../../assets/loading-spinner.gif";
import Notificacoes from "@/components/Notificacoes/Notificacoes";
import Usuario from "@/components/Usuario/Usuario";
import CardAvaliacoesClinica from "@/components/CardAvaliacoesClinica/CardAvaliacoesClinica";
import { Carousel } from "@mantine/carousel";

export default function Clinica() {
  const [loading, setLoading] = useState(false);
  const [subMenu, setSubMenu] = useState("destaques");
  const [infos, setInfos] = useState<any>({});

  const router = useRouter();
  const { id } = router.query;

  async function obterDadosClinica(id: any) {
    try {
      await getDoc(doc(firebase.db, "clinica", id))
        .then((x) => {
          if (x.exists()) setInfos(x.data());
        })
        .catch((e) => console.log(e));
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  function renderizarInfosClinica() {
    return (
      <div className="flex flex-col pt-[1rem] text-white">
        <span className="font-semibold text-2xl">{infos["nomeClinica"]}</span>
        {/* <span>{`${infos["cidade"]} - ${infos["estado"]}`}</span> */}
      </div>
    );
  }

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
    if (verificarIdQuery(id)) {
      obterDadosClinica(id);
      setLoading(false);
    }
  }, [id]);

  return loading ? (
    <div className="flex flex-col items-center">
      <Image src={LoadingSpiner} alt="" />
    </div>
  ) : (
    <div>
      <MenuLateral />
      <div
        className="
        w-[86%] left-[224px]
        absolute top-0
        "
        style={{
          backgroundImage: `url(${
            id?.includes("cardioexcel")
              ? CardioExcel.src
              : id?.includes("pedivida")
              ? Pedivida.src
              : id?.includes("ortomove")
              ? Ortomove.src
              : id?.includes("gynelogic")
              ? Gynelogic.src
              : id?.includes("demelo")
              ? DeMelo.src
              : id?.includes("dermello")
              ? DermelloBG.src
              : id?.includes("nutrife")
              ? Nutrife.src
              : ""
          })`,
          height: "22rem",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute right-[3rem] z-50">
          <div
            className="
          flex items-center justify-end gap-[1rem]
          pt-[1rem]
          "
          >
            <Notificacoes />
            <Usuario />
          </div>
        </div>
        <div
          className="
          absolute top-0 left-0 w-full h-full
          "
          style={{
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.4)", // Ajuste a cor de acordo com sua preferência
          }}
        ></div>
      </div>
      <div className="absolute top-[3rem] left-[250px]">
        <div>
          <div>
            <Image
              className="w-[7rem] h-[7rem] rounded-full"
              src={
                id && id.includes("nutrife")
                  ? Nutrife
                  : id && id.includes("pedivida")
                  ? Pedivida
                  : id && id.includes("ortomove")
                  ? Ortomove
                  : id && id.includes("gynelogic")
                  ? Gynelogic
                  : id && id.includes("demelo")
                  ? DeMelo
                  : id && id.includes("cardioexcel")
                  ? CardioExcel
                  : id && id.includes("dermello")
                  ? Dermello
                  : ""
              }
              alt=""
            />
          </div>
          {Object.values(infos).length > 0 ? (
            renderizarInfosClinica()
          ) : (
            <div>
              <Image src={Loading} width={90} alt="" />
            </div>
          )}
          {/* Contatar clínica e ver planos */}
          <div
            className="
          flex items-center gap-[1rem]
          pt-[1rem]
          "
          >
            <button
              className="
            px-2 py-1 
            rounded-md 
            bg-white 
            text-xl
            transition-all
            outline outline-white
            hover:bg-transparent
            hover:text-white
            "
            >
              Contatar clínica
            </button>
            <button
              className="
            px-2 py-1 
            rounded-md 
            text-xl 
            outline outline-white text-white
            transition-all hover:bg-white hover:text-black
            "
            >
              Ver planos
            </button>
          </div>
        </div>
      </div>
      {/* Destaques, Infos. e Avaliações */}
      <div
        className="
      w-[86%] min-h-[3rem]
      absolute left-[224px] top-[19rem]
      bg-[rgba(217, 217, 217, 0.10)]
      backdrop-blur-md
      "
      >
        <div
          className="
          pt-[1rem]
        flex items-center justify-center 
        gap-[2rem]
        text-white
        "
        >
          <div className="relative">
            <p>Destaques</p>
            <div
              className="
            absolute top-[1.8rem]
            w-full h-1 bg-white
            "
            ></div>
          </div>
          <div>
            <p>Informações</p>
          </div>
          <div>
            <p>Avaliações</p>
          </div>
        </div>
      </div>
      {/* 
        Se for destaques, ...
        Se for informações, ...
        Se for avaliações, ...
      */}
      <div
        className="
      w-[calc(100%-244px)]
      absolute left-[244px] top-[23rem] 
      overflow-y-auto overflow-x-hidden
      pb-[2rem]
      "
      >
        {/* DESTAQUES */}
        <div className="flex flex-wrap gap-[2rem]">
          <iframe
            className="rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117083.04458141731!2d-46.85817933206246!3d-23.50208664529539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce56dc138906d5%3A0xfa2f75da82a1dd3c!2sHospital%20Israelita%20Albert%20Einstein!5e0!3m2!1spt-BR!2sbr!4v1698166483407!5m2!1spt-BR!2sbr"
            height={530}
            width={"50%"}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div>
            <CardAvaliacoesClinica avaliacaoMedia={infos.avaliacaoMedia} />
            <div className="pt-[2rem]">
              <Carousel
                className="max-w-[340px]"
                withIndicators
                loop
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
                }}
              >
                <Carousel.Slide>
                  <Image
                    className="rounded-lg"
                    src={
                      id && id.includes("nutrife")
                        ? Nutrife
                        : id && id.includes("pedivida")
                        ? Pedivida
                        : id && id.includes("ortomove")
                        ? Ortomove
                        : id && id.includes("gynelogic")
                        ? Gynelogic
                        : id && id.includes("demelo")
                        ? DeMelo
                        : id && id.includes("cardioexcel")
                        ? CardioExcel
                        : id && id.includes("dermello")
                        ? Dermello
                        : ""
                    }
                    alt=""
                  />
                </Carousel.Slide>
                <Carousel.Slide>
                  <Image
                    className="rounded-lg"
                    src={
                      id && id.includes("nutrife")
                        ? Nutrife
                        : id && id.includes("pedivida")
                        ? Pedivida
                        : id && id.includes("ortomove")
                        ? Ortomove
                        : id && id.includes("gynelogic")
                        ? Gynelogic
                        : id && id.includes("demelo")
                        ? DeMelo
                        : id && id.includes("cardioexcel")
                        ? CardioExcel
                        : id && id.includes("dermello")
                        ? Dermello
                        : ""
                    }
                    alt=""
                  />
                </Carousel.Slide>
                <Carousel.Slide>
                  <Image
                    className="rounded-lg"
                    src={
                      id && id.includes("nutrife")
                        ? Nutrife
                        : id && id.includes("pedivida")
                        ? Pedivida
                        : id && id.includes("ortomove")
                        ? Ortomove
                        : id && id.includes("gynelogic")
                        ? Gynelogic
                        : id && id.includes("demelo")
                        ? DeMelo
                        : id && id.includes("cardioexcel")
                        ? CardioExcel
                        : id && id.includes("dermello")
                        ? Dermello
                        : ""
                    }
                    alt=""
                  />
                </Carousel.Slide>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
