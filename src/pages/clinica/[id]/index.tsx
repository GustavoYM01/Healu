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
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firebase } from "@/firebase/config";
import { verificarIdQuery } from "@/functions/verificarIdQuery";
import MenuLateral from "@/components/MenuLateral/MenuLateral";
import Loading from "../../../assets/loading-spinner.gif";
import Notificacoes from "@/components/Notificacoes/Notificacoes";
import Usuario from "@/components/Usuario/Usuario";
import CardAvaliacoesClinica from "@/components/CardAvaliacoesClinica/CardAvaliacoesClinica";
import { Carousel } from "@mantine/carousel";
import InfosClinica from "@/components/InfosClinica/InfosClinica";
import CardAvaliacoesDetalhadas from "@/components/CardAvaliacoesDetalhadas/CardAvaliacoesDetalhadas";
import MostradorEstrelas from "@/components/MostradorEstrelas/MostradorEstrelas";

export default function Clinica() {
  const [loading, setLoading] = useState(false);
  const [subMenu, setSubMenu] = useState("destaques");
  const [infos, setInfos] = useState<any>({});
  const [avaliacoes, setAvaliacoes] = useState<any>([]);

  const router = useRouter();
  const { id } = router.query;

  async function obterDadosClinica(id: any) {
    try {
      await getDoc(doc(firebase.db, "clinica", id))
        .then((x) => {
          if (x.exists()) setInfos(x.data());
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }

  function renderizarInfosClinica() {
    return (
      <div className="flex flex-col pt-[1rem] text-white">
        <span className="font-semibold text-2xl">{infos["nomeClinica"]}</span>
      </div>
    );
  }

  const obterAvaliacoes = async (idClinica: any) => {
    await getDocs(
      query(collection(firebase.db, "avaliacoes"), where("id", "==", idClinica))
    ).then((x) => {
      if (x.size > 0) {
        let infosArr: any[] = [];
        x.forEach((v) => {
          infosArr.push(v.data());
        });
        const novosDados: any = [];
        infosArr.forEach((x) => {
          const dadosAvaliacao: any = {};
          for (const propriedade in x) {
            if (
              x.hasOwnProperty(propriedade) &&
              propriedade.startsWith("infosAvaliacao")
            ) {
              dadosAvaliacao[propriedade] = x[propriedade];
            }
          }
          novosDados.push({
            avaliacoes: dadosAvaliacao,
          });
        });
        if (Array.from(novosDados).length > 0) {
          setAvaliacoes(novosDados);
        }
      }
      return;
    });
    return;
  };

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
      obterAvaliacoes(id);
      setLoading(false);
    }
  }, [id, avaliacoes]);

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
          <div
            className="relative cursor-pointer"
            onClick={() => setSubMenu("destaques")}
          >
            {/* DESTAQUES */}
            <p>Destaques</p>
            {subMenu === "destaques" && (
              <div
                className="
                absolute top-[1.8rem]
                w-full h-1 bg-white
                "
              ></div>
            )}
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => setSubMenu("informacoes")}
          >
            {/* INFORMAÇÕES */}
            <p>Informações</p>
            {subMenu === "informacoes" && (
              <div
                className="
                absolute top-[1.8rem]
                w-full h-1 bg-white
                "
              ></div>
            )}
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => setSubMenu("avaliacoes")}
          >
            {/* AVALIAÇÕES */}
            <p>Avaliações</p>
            {subMenu === "avaliacoes" && (
              <div
                className="
                absolute top-[1.8rem]
                w-full h-1 bg-white
                "
              ></div>
            )}
          </div>
        </div>
      </div>
      <div
        className="
      w-[calc(100%-244px)]
      absolute left-[244px] top-[23rem] 
      overflow-y-auto overflow-x-hidden
      pb-[2rem]
      "
      >
        {/* DESTAQUES */}
        {subMenu === "destaques" ? (
          <div className="flex flex-wrap gap-[2rem]">
            <iframe
              className="rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117083.04458141731!2d-46.85817933206246!3d-23.50208664529539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce56dc138906d5%3A0xfa2f75da82a1dd3c!2sHospital%20Israelita%20Albert%20Einstein!5e0!3m2!1spt-BR!2sbr!4v1698166483407!5m2!1spt-BR!2sbr"
              height={510}
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
        ) : subMenu === "informacoes" ? (
          <InfosClinica
            nomeClinica={
              String(infos.nomeClinica).split("-")[0] ??
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa quo et saepe, enim magnam sed delectus porro maiores id est! Iure eveniet facere placeat velit quasi quod quisquam eos fugit."
            }
            qualidadesClinica={String(
              infos.infosClinica?.qualidades ??
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa quo et saepe, enim magnam sed delectus porro maiores id est! Iure eveniet facere placeat velit quasi quod quisquam eos fugit."
            )}
            textoAntesServsClinica={String(
              infos.infosClinica?.textoAntesServs ??
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa quo et saepe, enim magnam sed delectus porro maiores id est! Iure eveniet facere placeat velit quasi quod quisquam eos fugit."
            )}
            servsRealizadosClinica={String(
              infos.infosClinica?.servsRealizados ??
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa quo et saepe, enim magnam sed delectus porro maiores id est! Iure eveniet facere placeat velit quasi quod quisquam eos fugit."
            )}
            infosRelevantesClinica={String(
              infos.infosClinica?.infosRelevantes ??
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa quo et saepe, enim magnam sed delectus porro maiores id est! Iure eveniet facere placeat velit quasi quod quisquam eos fugit."
            )}
            valoresClinica={String(
              infos.infosClinica?.valores ??
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa quo et saepe, enim magnam sed delectus porro maiores id est! Iure eveniet facere placeat velit quasi quod quisquam eos fugit."
            )}
            missaoClinica={String(
              infos.infosClinica?.missao ??
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa quo et saepe, enim magnam sed delectus porro maiores id est! Iure eveniet facere placeat velit quasi quod quisquam eos fugit."
            )}
          />
        ) : subMenu === "avaliacoes" ? (
          <div>
            <CardAvaliacoesDetalhadas avaliacaoMedia={infos.avaliacaoMedia} />
            {Array.from(avaliacoes).map((avaliacao: any, i: any) => {
              if (avaliacao && typeof avaliacao === "object") {
                const infosAvaliacaoKeys = Object.keys(
                  avaliacao.avaliacoes
                ).filter((key) => key.startsWith("infosAvaliacao"));
                return (
                  <div
                    className="
                    max-w-[1070px]
                  bg-[#EFF2FC] mt-[1rem] p-4
                  rounded-lg
                  "
                    key={i}
                  >
                    {infosAvaliacaoKeys.map((x: string, j: number) => {
                      const info = avaliacao.avaliacoes[x];
                      if (info) {
                        return (
                          <div key={j}>
                            <div className="flex items-center gap-[1rem]">
                              <div className="bg-[#CED2E4] rounded-full p-[.6rem]">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M15.874 13.5819C17.1744 12.4813 18 10.8371 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 10.8371 6.82561 12.4813 8.12603 13.5819C7.43891 13.8968 6.80205 14.2962 6.23721 14.7718C5.46449 15.4225 4.83914 16.2056 4.40787 17.0824C3.97613 17.9601 3.75 18.9097 3.75 19.875C3.75 20.4963 4.25368 21 4.875 21C5.49632 21 6 20.4963 6 19.875C6 19.2644 6.14245 18.6536 6.42685 18.0754C6.7117 17.4963 7.136 16.9565 7.68652 16.4929C8.23734 16.029 8.90116 15.653 9.6439 15.394C10.3866 15.1349 11.1877 15 12 15C12.8123 15 13.6134 15.1349 14.3561 15.394C15.0988 15.653 15.7627 16.029 16.3135 16.4929C16.864 16.9565 17.2883 17.4963 17.5732 18.0754C17.8575 18.6536 18 19.2644 18 19.875C18 20.4963 18.5037 21 19.125 21C19.7463 21 20.25 20.4963 20.25 19.875C20.25 18.9097 20.0239 17.9601 19.5921 17.0824C19.1609 16.2056 18.5355 15.4225 17.7628 14.7718C17.1979 14.2962 16.5611 13.8968 15.874 13.5819ZM15.75 9C15.75 11.0711 14.0711 12.75 12 12.75C9.92893 12.75 8.25 11.0711 8.25 9C8.25 6.92893 9.92893 5.25 12 5.25C14.0711 5.25 15.75 6.92893 15.75 9Z"
                                    fill="#222222"
                                  />
                                </svg>
                              </div>
                              <div>
                                <MostradorEstrelas
                                  qtdEstrelas={5}
                                  mediaAvaliacao={info.nota}
                                />
                                <span className="inline-block pt-1">
                                  {info.usuario}
                                </span>
                              </div>
                            </div>
                            <p className="pt-[1rem]">{info.comentario}</p>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
