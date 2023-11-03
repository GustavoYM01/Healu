import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
export default function Usuario() {
  const [mostrarModal, setMostrarModal] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (e.target !== ref.current) setMostrarModal(false);
    });
  }, []);
  return (
    <div
      className="relative max-w-fit"
      onClick={() => setMostrarModal(!mostrarModal)}
    >
      <div
        className="
        flex items-center justify-center
        w-8 h-8 rounded-full
        cursor-pointer
        bg-[#EFF2FC]
        "
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
            d="M15.874 13.5819C17.1744 12.4813 18 10.8371 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 10.8371 6.82561 12.4813 8.12603 13.5819C7.43891 13.8968 6.80205 14.2962 6.23721 14.7718C5.46449 15.4225 4.83914 16.2056 4.40787 17.0824C3.97613 17.9601 3.75 18.9097 3.75 19.875C3.75 20.4963 4.25368 21 4.875 21C5.49632 21 6 20.4963 6 19.875C6 19.2644 6.14245 18.6536 6.42685 18.0754C6.7117 17.4963 7.136 16.9565 7.68652 16.4929C8.23734 16.029 8.90116 15.653 9.6439 15.394C10.3866 15.1349 11.1877 15 12 15C12.8123 15 13.6134 15.1349 14.3561 15.394C15.0988 15.653 15.7627 16.029 16.3135 16.4929C16.864 16.9565 17.2883 17.4963 17.5732 18.0754C17.8575 18.6536 18 19.2644 18 19.875C18 20.4963 18.5037 21 19.125 21C19.7463 21 20.25 20.4963 20.25 19.875C20.25 18.9097 20.0239 17.9601 19.5921 17.0824C19.1609 16.2056 18.5355 15.4225 17.7628 14.7718C17.1979 14.2962 16.5611 13.8968 15.874 13.5819ZM15.75 9C15.75 11.0711 14.0711 12.75 12 12.75C9.92893 12.75 8.25 11.0711 8.25 9C8.25 6.92893 9.92893 5.25 12 5.25C14.0711 5.25 15.75 6.92893 15.75 9Z"
            fill="#222222"
          />
        </svg>
      </div>
      <div
        className={`
        absolute 
        top-[2.1rem] right-[.6rem]
        w-0 h-0 
        border-l-[.5rem] border-l-transparent
        border-b-[.6rem] border-b-[#EFF2FC]
        border-r-[.5rem] border-r-transparent
        transition-all ease-in-out
        opacity-0
        ${mostrarModal && "opacity-100"}
        `}
      ></div>
      <div
        className={`
        absolute 
        top-[2.5rem] right-[.5rem]
        px-[1rem] py-[.5rem]
        bg-[#EFF2FC] rounded-md
        transition-all ease-in-out
        opacity-0
        ${mostrarModal && "opacity-100"}
        `}
      >
        <ul className="text-center">
          <li>
            <Link
              className="
            transition-all ease-in-out
            hover:text-[#2642D9]
            "
              href="/dados"
            >
              Dados
            </Link>
          </li>
          <li>
            <Link
              className="
            transition-all ease-in-out
            hover:text-[#2642D9]
            "
              href="/config"
            >
              Configurações
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
