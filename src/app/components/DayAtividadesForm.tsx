import React, { useState, useEffect } from "react";

import styles from "@/styles/DayAtividades.module.css";
interface DayAtividadesFormProps {
  date: string;
}

const DayAtividadesForm: React.FC<DayAtividadesFormProps> = ({
  date,
}): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState("");
  const [moneyChange, setMoneyChange] = useState("");
  const [activityData, setActivityData] = useState({
    type: "",
    start_time: "",
    end_time: "",
    moneyChange: "",
    description: "",
  });
  console.log(activityData);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(event.target.value);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivityData((prevState) => ({ ...prevState, [name]: value }));
  }

  let dateClicked = date;
  console.log(dateClicked);
  useEffect(() => {
    let moneyChangeElement;

    if (selectedOption === "Trabalho") {
      moneyChangeElement = "Ganho";
    } else {
      moneyChangeElement = "Gastos";
    }
    setMoneyChange(moneyChangeElement);
  }, [selectedOption]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    };
    fetch("/api/atividades", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <form className={styles.formWrapper} action="" onSubmit={handleSubmit}>
      <label htmlFor="">Tipo de atividade</label>
      <select name="type" id="atividades" onChange={handleSelectChange}>
        <option value="Lazer">Lazer</option>
        <option value="Exercicios">Exercicios</option>
        <option value="Outros">Outros</option>
        <option value="Trabalho">Trabalho</option>
      </select>
      <div>
        <label htmlFor="">tempo de inicio</label>
        <input type="text" name="start_time" onChange={handleChange} />
        <label htmlFor=""> termino</label>
        <input type="text" name="end_time" onChange={handleChange} />
      </div>
      <label htmlFor="">{moneyChange}</label>

      <input type="text" name="money_change" onChange={handleChange} />
      <label htmlFor="">descrição</label>
      <textarea name="description" onChange={handleChange}></textarea>
      <div className={styles.btnFormWrapper}>
        <button type="submit">SALVAR</button>
        <button>DISCARTAR</button>
      </div>
    </form>
  );
};

export default DayAtividadesForm;
