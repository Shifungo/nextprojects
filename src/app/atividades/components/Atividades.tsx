import React, { useState, useEffect, HTMLAttributes } from "react";
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
interface MonthsMap {
  [key: string]: string;
}
const Atividades: React.FC<AtividadesProps> = (date) => {
  const [data, setData] = useState<MyData[] | null>(null);

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
  }, [date]);
  let id = "0";

  function atividadeButtonHandler(event: React.MouseEvent<HTMLButtonElement>) {
    const button = (event.target as HTMLInputElement).id;
    id = button;
  }

  const atividadesGrid = data?.map((atividade) => {
    let atividadeType = atividade.type;
    return (
      <button
        onClick={atividadeButtonHandler}
        key={atividade.id}
        id={atividade.id.toString()}
        className={`${style.atividade} ${style[atividadeType]}`}
      >
        {atividade.type}
      </button>
    );
  });

  return (
    <div>
      <div className=" flex flex-wrap">{atividadesGrid}</div>
      <div>
        <AtividadesWindow id={id} />
      </div>
    </div>
  );
};
export default Atividades;
