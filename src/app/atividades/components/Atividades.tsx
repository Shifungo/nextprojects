import React, { useState, useEffect } from "react";
import style from "@/styles/Atividades.module.css";

interface MyData {
  date: string;
  id: number;
  type: string;
  start_time: string;
  end_time: string;
  moneyChange: string;
  description: string;
}

interface AtividadesProps {
  date: string;
}
const Atividades: React.FC<AtividadesProps> = (date) => {
  const [data, setData] = useState<MyData[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `/api/atividadeHandler/getAtividades/?date=${date.date}`
      );
      console.log(date);
      const text = await res.text();

      console.log("Response text:", text);

      const json = JSON.parse(text);
      console.log("JSON data:", json);
      setData(json as MyData[]);
    }
    fetchData();
  }, [date]);

  const atividadesGrid = data?.map((atividade) => {
    let atividadeType = atividade.type;
    return (
      <span
        key={atividade.id}
        className={`${style.atividade} ${style[atividadeType]}`}
      >
        {atividade.type}
      </span>
    );
  });

  return (
    <div>
      <div className=" flex flex-wrap">{atividadesGrid}</div>
    </div>
  );
};
export default Atividades;
