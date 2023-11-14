import ItensMenuLateral from "../ItensMenuLateral/ItensMenuLateral";
import { alterarHref } from "@/functions/alterarHref";
import { useRouter } from "next/router";
import Logout from "../Logout/Logout";

export default function MenuLateral() {
  const router = useRouter();
  return (
    <menu
      className="
      fixed
      bg-[#EFF2FC] 
      max-w-[15rem] h-[100vh]
      px-[2rem] py-[1rem]
      "
    >
      {/* LOGO HEALU */}
      <div className="flex items-center justify-center pb-[4rem]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5 20C5 18.9645 5.83947 18.125 6.875 18.125H12.1875C17.5378 18.125 21.875 22.4622 21.875 27.8125V33.125C21.875 34.1605 21.0355 35 20 35C18.9645 35 18.125 34.1605 18.125 33.125V27.8125C18.125 24.5333 15.4667 21.875 12.1875 21.875H6.875C5.83947 21.875 5 21.0355 5 20Z"
            fill="#222222"
          />
          <path
            d="M20 5C21.0355 5 21.875 5.83947 21.875 6.875L21.875 12.1875C21.875 15.4667 24.5333 18.125 27.8125 18.125L33.125 18.125C34.1605 18.125 35 18.9645 35 20C35 21.0355 34.1605 21.875 33.125 21.875L27.8125 21.875C22.4622 21.875 18.125 17.5378 18.125 12.1875V6.875C18.125 5.83947 18.9645 5 20 5Z"
            fill="#2642D9"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="40"
          viewBox="0 0 120 40"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.875 5C7.91053 5 8.75 5.83947 8.75 6.875V16.2738C10.6031 14.6997 13.0031 13.75 15.625 13.75C21.493 13.75 26.25 18.507 26.25 24.375V33.125C26.25 34.1606 25.4105 35 24.375 35C23.3395 35 22.5 34.1606 22.5 33.125V24.375C22.5 20.5781 19.422 17.5 15.625 17.5C11.828 17.5 8.75 20.5781 8.75 24.375V33.125C8.75 34.1606 7.91053 35 6.875 35C5.83947 35 5 34.1606 5 33.125V6.875C5 5.83947 5.83947 5 6.875 5Z"
            fill="#222222"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M95.625 13.75C96.6605 13.75 97.5 14.5895 97.5 15.625V24.375C97.5 28.172 100.578 31.25 104.375 31.25C108.172 31.25 111.25 28.172 111.25 24.375V15.625C111.25 14.5895 112.089 13.75 113.125 13.75C114.161 13.75 115 14.5895 115 15.625V33.125C115 34.1605 114.161 35 113.125 35C112.089 35 111.25 34.1605 111.25 33.125V32.4762C109.397 34.0503 106.997 35 104.375 35C98.507 35 93.75 30.243 93.75 24.375V15.625C93.75 14.5895 94.5895 13.75 95.625 13.75Z"
            fill="#2642D9"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M80 5C81.0355 5 81.875 5.83947 81.875 6.875V24.3747C81.875 28.1716 84.953 31.2497 88.75 31.2497C89.7855 31.2497 90.625 32.0891 90.625 33.1247C90.625 34.1602 89.7855 34.9997 88.75 34.9997C82.882 34.9997 78.125 30.2427 78.125 24.3747V6.875C78.125 5.83947 78.9645 5 80 5Z"
            fill="#222222"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M64.375 17.5C60.578 17.5 57.5 20.578 57.5 24.375C57.5 28.172 60.578 31.25 64.375 31.25C68.172 31.25 71.25 28.172 71.25 24.375C71.25 20.578 68.172 17.5 64.375 17.5ZM71.25 32.4762V33.125C71.25 34.1605 72.0895 35 73.125 35C74.1605 35 75 34.1605 75 33.125V24.375C75 18.507 70.243 13.75 64.375 13.75C58.507 13.75 53.75 18.507 53.75 24.375C53.75 30.243 58.507 35 64.375 35C66.9969 35 69.3969 34.0503 71.25 32.4762Z"
            fill="#222222"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M40 17.5C36.203 17.5 33.125 20.578 33.125 24.375C33.125 28.172 36.203 31.25 40 31.25C41.9241 31.25 43.6608 30.462 44.9108 29.1864C45.6356 28.4468 46.8227 28.4348 47.5623 29.1595C48.3019 29.8843 48.314 31.0714 47.5892 31.811C45.6629 33.7768 42.9726 35 40 35C34.132 35 29.375 30.243 29.375 24.375C29.375 18.507 34.132 13.75 40 13.75C45.868 13.75 50.625 18.507 50.625 24.375C50.625 25.4105 49.7855 26.25 48.75 26.25H40C38.9645 26.25 38.125 25.4105 38.125 24.375C38.125 23.3395 38.9645 22.5 40 22.5H46.6162C45.8 19.6144 43.1469 17.5 40 17.5Z"
            fill="#222222"
          />
        </svg>
      </div>
      {/* FIM LOGO HEALU */}
      <div className="flex flex-col justify-center gap-[1rem]">
        <ItensMenuLateral
          tipoItem="home"
          texto="Home"
          fazParteDaRota={router.asPath.includes("home")}
          onClick={() => alterarHref("/home")}
        />
        <ItensMenuLateral
          tipoItem="chat"
          texto="Chat"
          fazParteDaRota={router.asPath.includes("chat")}
          onClick={() => alterarHref("/chats")}
        />
        <ItensMenuLateral
          tipoItem="agenda"
          texto="Agenda"
          fazParteDaRota={router.asPath.includes("agenda")}
          onClick={() => alterarHref("/agenda")}
        />
        <ItensMenuLateral
          tipoItem="arquivos"
          texto="Arquivos"
          fazParteDaRota={router.asPath.includes("arquivos")}
          onClick={() => alterarHref("/arquivos")}
        />
        <Logout />
      </div>
    </menu>
  );
}
