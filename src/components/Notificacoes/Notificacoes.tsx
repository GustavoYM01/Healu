import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function Notificacoes() {
  const [svgFillBlack, setSvgFillBlack] = useState(false);
  const [mostrarNotificacao, setMostrarNotificacao] = useState(false);

  const router = useRouter();

  const ref = useRef(null);

  useEffect(() => {
    if (router.asPath === "/home" || router.asPath === "/dados")
      setSvgFillBlack(true);
    else setSvgFillBlack(false);
    window.addEventListener("click", (e: any) => {
      if (e.target !== ref.current) setMostrarNotificacao(false);
    });
  }, []);
  return (
    <div className="relative max-w-fit">
      <div
        className="
          flex items-center justify-center
          w-8 h-8 rounded-full
          p-1
          cursor-pointer
        "
        onClick={() => setMostrarNotificacao(!mostrarNotificacao)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          ref={ref}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.125 4.125C13.125 3.50368 12.6213 3 12 3C11.3787 3 10.875 3.50368 10.875 4.125V4.41145C7.89074 4.9428 5.625 7.55056 5.625 10.6875V11.0977C5.625 12.6822 5.35964 14.2546 4.84073 15.75H4.125C3.50368 15.75 3 16.2537 3 16.875C3 17.4963 3.50368 18 4.125 18H5.625H18.375H19.875C20.4963 18 21 17.4963 21 16.875C21 16.2537 20.4963 15.75 19.875 15.75H19.1593C18.6404 14.2546 18.375 12.6822 18.375 11.0977V10.6875C18.375 7.55055 16.1093 4.9428 13.125 4.41145V4.125ZM7.875 10.6875C7.875 8.40933 9.72183 6.5625 12 6.5625C14.2782 6.5625 16.125 8.40932 16.125 10.6875V11.0977C16.125 12.6747 16.3519 14.2414 16.797 15.75H7.20304C7.64812 14.2414 7.875 12.6747 7.875 11.0977V10.6875ZM12 21C10.7574 21 9.75 19.9926 9.75 18.75H14.25C14.25 19.9926 13.2426 21 12 21Z"
            fill={`${svgFillBlack ? "black" : "white"}`}
          />
        </svg>
      </div>
      <div>
        <div
          className={`
        absolute 
        top-[1.6rem] right-[.5rem]
        w-0 h-0 
        border-l-[.5rem] border-l-transparent
        border-b-[.6rem] border-b-[#EFF2FC]
        border-r-[.5rem] border-r-transparent
        transition-all ease-in-out
        opacity-0 -z-10
        ${mostrarNotificacao && "opacity-100 z-20"}
        `}
        ></div>
        <div
          className={`
        absolute 
        top-[2rem] right-[.5rem]
        px-[1rem] py-[.5rem]
        bg-[#EFF2FC] rounded-md
        transition-all ease-in-out
        opacity-0 -z-10
        ${mostrarNotificacao && "opacity-100 z-20"}
        `}
        >
          Não há notificações
        </div>
      </div>
    </div>
  );
}
