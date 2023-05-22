import React, { useState, useEffect } from "react";
import style from "@/styles/Atividades.module.css";
import AtividadesWindow from "./AtividadesWindow";

interface MyData {
  date: string;
  id: number;
  type: string;
  start_time: string;
  end_time: string;
  moneyChange: string;
  description: string;
  month: string;
}

interface AtividadesProps {
  date: string;
  month: string;
}

const Atividades: React.FC<AtividadesProps> = (date) => {
  const [data, setData] = useState<MyData[] | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [dateProp, setDate] = useState({ date: date.date, month: date.month });
  console.log("date:", date);

  //fetch data from api
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `/api/atividadeHandler/getAtividades/?date=${date.date}&month=${date.month}`
      );
      const text = await res.text();

      const json = JSON.parse(text);
      console.log("JSON data:", json);
      setData(json as MyData[]);
    }
    fetchData();
  }, [dateProp]);

  //pega o id do botão clicado e abre a janela de atividades baseada no id
  function atividadeButtonHandler(event: React.MouseEvent<HTMLButtonElement>) {
    const button = (event.target as HTMLInputElement).id;
    const idNumber = parseInt(button, 10);
    if (!isNaN(idNumber)) {
      setId(idNumber);
    }
    setShow(true);
  }

  // fecha a janela de atividades
  function close() {
    setShow(false);
  }

  const atividadesGrid = data?.map((atividade) => {
    return (
      <button
        onClick={atividadeButtonHandler}
        key={atividade.id}
        id={atividade.id.toString()}
        className={`${style.atividade} bg-[#3E2424] rounded-3xl `}
      >
        {atividade.type}
      </button>
    );
  });

  return (
    <div>
      <div className="flex flex-wrap m-4 bg-[#906262] border-gray-300 shadow-inner rounded-3xl">
        {atividadesGrid}
      </div>
      <div>
        {show ? (
          id && typeof id === "number" ? (
            <AtividadesWindow id={id} show={show} setShow={close} />
          ) : (
            <div></div>
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
export default Atividades;
