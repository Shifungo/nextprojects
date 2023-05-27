import React, { useState, useEffect } from "react";
import styles from "@/styles/DayAtividades.module.css";
import { set } from "date-fns";

interface DayAtividadesFormProps {
  date: string;
  closeAtividade: () => void;
  month: string;
}
interface MyBankData {
  id: string;
  bank_name: string;
}
type ActivityData = {
  date: string;
  type: string;
  start_time: string;
  moneyChange: string;
  description: string;
  month: string;
  payment_method: string;
  card_id: string | null;
};

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
  //dados dos bancos
  const [bankAccounts, setBankAccounts] = useState<MyBankData[] | null>(null);
  const [bankAccountOptions, setBankAccountOptions] = useState<JSX.Element>(
    <option value="">Carregando...</option>
  );
  //guarda os dados do form
  const [activityData, setActivityData] = useState<ActivityData>({
    date: date,
    type: "",
    start_time: "00:00",
    moneyChange: "",
    description: "",
    month: month,
    payment_method: metodo,
    card_id: null,
  });
  const [metodoPagamento, setMetodoPagamento] = useState<JSX.Element | null>(
    null
  );
  console.log(activityData);

  //muda o valor do select de acordo com o valor do fetch dos bancos 5/22/2023
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/banks");
        const data = await response.json();
        setBankAccounts(data);
        console.log(data);

        let bankAccountOptions: JSX.Element | null = null;
        setBankAccountOptions(<option value="">Carregando...</option>);
        if (data) {
          bankAccountOptions = (
            <>
              {data.map((bankAccount: MyBankData) => (
                <option key={bankAccount.id} value={bankAccount.id}>
                  {bankAccount.bank_name}
                </option>
              ))}
            </>
          );
        } else if (data === null) {
          bankAccountOptions = (
            <option value="">Nenhum banco cadastrado</option>
          );
        } else {
          bankAccountOptions = <option value="">Carregando...</option>;
        }
        console.log(bankAccountOptions);
        setBankAccountOptions(bankAccountOptions);
      } catch (error) {
        console.error(error);
      }
    };
    setActivityData((prevState) => ({
      ...prevState,
      payment_method: metodo,
    }));
    fetchData();
  }, [metodo]);

  //muda o valor do tipo das atividades quando o select muda
  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(event.target.value);
    setActivityData((prevState) => ({
      ...prevState,
      type: event.target.value,
    }));
  }
  //altera o valor do metodo do banco quando o select muda
  function handleBankSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setActivityData((prevState) => ({
      ...prevState,
      card_id: event.target.value,
    }));
  }

  //altera o valor das atividades quuando o input muda
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivityData((prevState) => ({ ...prevState, [name]: value }));
  }
  console.log("this is the card id " + activityData.card_id);
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
  }
  useEffect(() => {
    if (metodo === "CASH") {
      setMetodoPagamento(() => (
        <div>
          <label htmlFor="">{moneyChange}</label>
          <input type="number" name="moneyChange" onChange={handleChange} />
        </div>
      ));
    } else if (metodo === "CARD") {
      setMetodoPagamento(() => (
        <div>
          <label htmlFor="">{moneyChange}</label>
          <input type="number" name="moneyChange" onChange={handleChange} />
          <label htmlFor="">QUAL CARTAO</label>
          <select name="bank" id="" onChange={handleBankSelectChange}>
            <option value="select">Escolha um Banco</option>
            {bankAccountOptions}
          </select>
        </div>
      ));
    } else if (metodo === "PIX") {
      setMetodoPagamento(() => (
        <div>
          <label htmlFor="">{moneyChange}</label>
          <input type="number" name="moneyChange" onChange={handleChange} />
          <label htmlFor="">QUAL BANCO</label>
          <select name="bank" id="" onChange={handleBankSelectChange}>
            <option value="select">Escolha um Banco</option>

            {bankAccountOptions}
          </select>
        </div>
      ));
    } else if (metodo === "TRANSFER") {
      setMetodoPagamento(() => (
        <div>
          <label htmlFor="">{moneyChange}</label>
          <input type="number" name="moneyChange" onChange={handleChange} />
          <label htmlFor="">QUAL BANCO</label>
          <select name="bank" id="" onChange={handleBankSelectChange}>
            <option value="select">Escolha um Banco</option>

            {bankAccountOptions}
          </select>
        </div>
      ));
    }
  }, [metodo]);

  return (
    <div className={`${styles.formDiv} bg-[#3E2424]`}>
      <form
        className="flex flex-col  m-5 text-[#e29898]"
        action=""
        onSubmit={handleSubmit}
      >
        <div>
          <button onClick={closeAtividade}>X</button>
        </div>
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
            <option value="CASH">Dinheiro</option>
            <option value="CARD">Cartão</option>
            <option value="PIX">Pix</option>
            <option value="TRANSFER">Transferencia</option>
          </select>
        </div>

        <label htmlFor="">descrição</label>
        <textarea
          name="description"
          className=" m-2"
          onChange={handleChange}
        ></textarea>
        <div>{metodoPagamento}</div>
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
