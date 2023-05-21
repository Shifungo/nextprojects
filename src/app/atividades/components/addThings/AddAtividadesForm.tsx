import React, { useState, useEffect, use } from "react";
import styles from "@/styles/DayAtividades.module.css";
import { JsxElement } from "typescript";

interface DayAtividadesFormProps {
  date: string;
  closeAtividade: () => void;
  month: string;
}

const DayAtividadesForm: React.FC<DayAtividadesFormProps> = ({
  date,
  closeAtividade,
  month,
}): JSX.Element => {
  const [disableSubmit, setDisableSubmit] = useState(true);
  //guarda qual o valor do select
  const [selectedOption, setSelectedOption] = useState("");
  const [metodo, setMetodo] = useState("");
  //muda o nome do label de acordo com o valor do select para gasto ou ganho
  const [moneyChange, setMoneyChange] = useState("");
  //guarda os dados do form
  const [activityData, setActivityData] = useState({
    date: date,
    type: "",
    start_time: "00:00",
    end_time: "00:00",
    moneyChange: "",
    description: "",
    month: month,
  });
  const [metodoPagamento, setMetodoPagamento] = useState<JSX.Element | null>(
    null
  );

  //muda o valor das atividades quando o select muda
  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(event.target.value);
    setActivityData((prevState) => ({
      ...prevState,
      type: event.target.value,
    }));
  }
  //altera o valor das atividades quuando o input muda
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivityData((prevState) => ({ ...prevState, [name]: value }));
  }

  //muda o campo de dinheiro para ganho ou gasto de acordo com o valor do select
  useEffect(() => {
    let moneyChangeElement;

    setDisableSubmit(selectedOption !== "selecione" ? false : true);
    console.log(disableSubmit);

    if (selectedOption === "Trabalho") {
      moneyChangeElement = "Ganho";
    } else {
      moneyChangeElement = "Gastos";
    }
    setMoneyChange(moneyChangeElement);
  }, [selectedOption]);
  //submit form data
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    closeAtividade();
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    };
    fetch("/api/atividadeHandler/postAtividades", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  //muda o metodo de pagamento
  function handleMetodoPagamento(event: React.ChangeEvent<HTMLSelectElement>) {
    setMetodo(event.target.value);
    if (metodo === "dinheiro") {
      setMetodoPagamento(() => (
        <div>
          <label htmlFor="">Valor</label>
          <input
            type="number"
            name="moneyChange"
            onChange={handleChange}
            required
          />
        </div>
      ));
    }
  }
  useEffect(() => {}, [metodo]);
  return (
    <div className={`${styles.formDiv} bg-[#3E2424]`}>
      <form
        className="flex flex-col  m-5 text-[#e29898]"
        action=""
        onSubmit={handleSubmit}
      >
        <label className="m-2" htmlFor="">
          Tipo de atividade
        </label>
        <select
          className="m-2"
          name="type"
          id="atividades"
          onChange={handleSelectChange}
          required
        >
          <option className="bg-red-500" value="selecione">
            selecione
          </option>
          <option value="Lazer">Lazer</option>
          <option value="Exercicios">Exercicios</option>
          <option value="Outros">Outros</option>
          <option value="Trabalho">Trabalho</option>
        </select>
        <div className="">
          <label htmlFor="">Time</label>
          <input
            type="number"
            name="start_time"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="">Medoto de Pagamento</label>
          <select name="metodo" id="payment" onChange={handleMetodoPagamento}>
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao">Cartão</option>
            <option value="pix">Pix</option>
            <option value="transferencia">Transferencia</option>
            <option value="outros">Outros</option>
          </select>
        </div>
        <label htmlFor="">{moneyChange}</label>

        <input type="number" name="moneyChange" onChange={handleChange} />
        <label htmlFor="">descrição</label>
        <textarea
          name="description"
          className=" m-2"
          onChange={handleChange}
        ></textarea>
        <div className={styles.btnFormWrapper}>
          <button type="submit" disabled={disableSubmit}>
            SALVAR
          </button>
          <button type="button" onClick={closeAtividade}>
            DISCARTAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default DayAtividadesForm;
