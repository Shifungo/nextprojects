import React from "react";
const Who = () => {
  return (
    <div>
      <div className="flex flex-col justify-center content-center">
        <h1 className=" flex text-8xl font-semibold justify-center m-2">
          <span>
            Ola meu nome é <span className=" text-red-500"> Jean</span>
          </span>
        </h1>
        <p className="flex justify-center text-center text-2xl">
          Sou um estudande de Ciencia de Dados e WebDev
        </p>
      </div>
      <div className="m-10">
        <ul>
          <li className="text-xl font-semibold">
            Atualmente cursando o 2º semestre de Ciencia de dados
          </li>
          <li className=" text-xl font-semibold">
            Possuo tambem um vasto conhecimento na area de WebDev, com foco em
            ReactJS e NodeJS.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Who;
