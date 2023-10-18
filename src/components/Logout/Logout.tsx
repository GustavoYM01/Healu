import { sair } from "@/firebase/funcoes";
import React from "react";

export default function Logout() {
  async function logout() {
    await sair().then(() => (location.href = "/"));
  }
  return (
    <div
      className="
    flex items-center justify-start
    gap-[0.5rem] py-2 pl-3
    "
    >
      <svg
        onClick={logout}
        className="cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.875 4.125C7.875 3.50368 8.37868 3 9 3H17.625C19.489 3 21 4.51104 21 6.375V17.625C21 19.489 19.489 21 17.625 21H9C8.37868 21 7.875 20.4963 7.875 19.875C7.875 19.2537 8.37868 18.75 9 18.75H17.625C18.2463 18.75 18.75 18.2463 18.75 17.625V6.375C18.75 5.75368 18.2463 5.25 17.625 5.25H9C8.37868 5.25 7.875 4.74632 7.875 4.125Z"
          fill="#222222"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.2095 7.47774C9.78301 7.92954 9.80352 8.64156 10.2553 9.06807L12.1694 10.875H4.125C3.50368 10.875 3 11.3787 3 12C3 12.6213 3.50368 13.125 4.125 13.125H12.1694L10.2553 14.9319C9.80352 15.3584 9.78301 16.0705 10.2095 16.5223C10.636 16.9741 11.348 16.9946 11.7999 16.5681L15.7723 12.8181C15.9974 12.6055 16.125 12.3096 16.125 12C16.125 11.6904 15.9974 11.3945 15.7723 11.1819L11.7999 7.43193C11.348 7.00542 10.636 7.02593 10.2095 7.47774Z"
          fill="#222222"
        />
      </svg>
      <span onClick={logout} className="font-medium cursor-pointer">
        Log out
      </span>
    </div>
  );
}
