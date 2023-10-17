import React from "react";

export default function CarouselItem(props: any) {
  return (
    <div className="cursor-pointer" onClick={props?.onClick}>
      {props.children}
    </div>
  );
}
