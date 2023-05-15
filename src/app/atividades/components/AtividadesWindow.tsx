import React, { useState, useEffect } from "react";

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

interface AtividadesWindowProps {
  show: boolean;
  id: number | null;
  setShow: () => void;
}

function AtividadesWindow({ show, id, setShow }: AtividadesWindowProps) {
  const [data, setData] = useState<MyData[] | null>(null);

  useEffect(() => {
    async function getAtividades() {
      const res = await fetch(
        `/api/atividadeHandler/getAtividadesById/?id=${id}`
      );
      const text = await res.text();
      const json = JSON.parse(text);
      setData(json as MyData[]);
    }

    if (show && id) {
      getAtividades();
    }
  }, [id, show]);

  console.log(data);

  if (!show || !id) {
    return null;
  }
  console.log(data);
  const atividadeResume = (
    <div>
      <h1>Atividade</h1>
      <p>{data && data.length > 0 && data[0].type}</p>
      <p>{data && data.length > 0 && data[0].start_time}</p>
      <p>{data && data.length > 0 && data[0].end_time}</p>
      <p>{data && data.length > 0 && data[0].moneyChange}</p>
      <p>{data && data.length > 0 && data[0].description}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className=" bg-slate-800 p-8 rounded shadow-md">
        {atividadeResume}
      </div>
      <button onClick={setShow}>Close</button>
    </div>
  );
}
export default AtividadesWindow;
