import React from "react";
import styles from "@/styles/who.module.css";
const Who = () => {
  return (
    <div>
      <h1 className=" flex text-8xl font-semibold justify-center m-2">
        <span>
          Ola meu nome é <span className=" text-red-500"> Jean</span>
        </span>
      </h1>
      <p className="font-semibold">
        Sou um estudande de Ciencia de Dados e WebDev, e esse é meu portfolio
        <br />
        este site foi feito com Next.js
      </p>
    </div>
  );
};

export default Who;
