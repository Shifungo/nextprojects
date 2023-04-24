import { useState, useEffect } from "react";

interface MyData {
  id: number;
  type: string;
  start_time: string;
  end_time: string;
  moneyChange: string;
  description: string;
}
const Atividades = () => {
  const [data, setData] = useState<MyData[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/atividadeHandler");
      const text = await res.text();
      console.log("Response text:", text);
      const json = JSON.parse(text);
      console.log("JSON data:", json);
      setData(json as MyData[]);
    }
    fetchData();
  }, []);

  const atividadeData = data ? (
    data.map((item: MyData) => <span key={item.id}>{item.type}</span>)
  ) : (
    <span>"loading"</span>
  );

  return (
    <div>
      <div className=" flex flex-wrap">{}</div>
    </div>
  );
};
export default Atividades;
