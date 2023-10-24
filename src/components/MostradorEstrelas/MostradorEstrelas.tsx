import React from "react";

interface MostradorEstrelasProps {
  qtdEstrelas: number;
  mediaAvaliacao: number;
  className?: string;
}

export default function MostradorEstrelas(props: MostradorEstrelasProps) {
  const mediaArredondada = Math.floor(props.mediaAvaliacao);
  const estrelas = Array.from({ length: props.qtdEstrelas }, (_, index) => {
    const preenchida = index < mediaArredondada;
    return preenchida ? (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        height="14"
        viewBox="0 0 14 12"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.14926 0.700051C6.54004 0.0674298 7.46003 0.0674323 7.8508 0.700051L9.3962 3.20184L12.2531 3.8985C12.9755 4.07467 13.2598 4.94962 12.7789 5.51677L10.8771 7.75962L11.0974 10.692C11.1531 11.4335 10.4088 11.9742 9.7208 11.6921L7.00003 10.5765L4.27927 11.6921C3.59127 11.9742 2.84699 11.4335 2.90269 10.692L3.12295 7.75962L1.22116 5.51677C0.740261 4.94962 1.02455 4.07466 1.74697 3.8985L4.60386 3.20184L6.14926 0.700051Z"
          fill="#222222"
        />
      </svg>
    ) : (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        height="14"
        viewBox="0 0 26 24"
        fill="#000"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.2985 1.40035C12.08 0.135104 13.92 0.135109 14.7015 1.40035L17.7923 6.40392L23.5061 7.79725C24.951 8.14958 25.5195 9.89949 24.5577 11.0338L20.7542 15.5195L21.1947 21.3842C21.3061 22.8672 19.8175 23.9487 18.4415 23.3845L13 21.1532L7.55847 23.3845C6.18249 23.9487 4.69392 22.8672 4.80531 21.3842L5.24584 15.5195L1.44226 11.0338C0.480462 9.89949 1.04905 8.14957 2.49387 7.79725L8.20767 6.40392L11.2985 1.40035ZM13 4.35424L10.5445 8.32938C10.2683 8.77646 9.8273 9.09688 9.31677 9.22138L4.77739 10.3283L7.79918 13.892C8.13903 14.2928 8.30749 14.8113 8.26813 15.3353L7.91815 19.9946L12.2412 18.2219C12.7274 18.0226 13.2726 18.0226 13.7588 18.2219L18.0819 19.9946L17.7319 15.3353C17.6925 14.8113 17.861 14.2928 18.2008 13.892L21.2226 10.3283L16.6832 9.22138C16.1727 9.09688 15.7317 8.77646 15.4555 8.32938L13 4.35424Z"
          fill="black"
        />
      </svg>
    );
  });

  return <div className={`flex items-center ${props.className ?? ""}`}>{estrelas}</div>;
}
