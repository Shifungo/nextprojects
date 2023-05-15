import { set } from "date-fns";
import React, { useState, useEffect } from "react";

interface MyBankData {
  id: string;
  bank_name: string;
}
interface CardData {
  card_number: string;
  card_name: string;
  card_close_day: number;
  card_due_day: number;
  card_limit: number;
  bank_account_id: number;
}
interface AddCardFormProps {
  addCard: Boolean;
  setAddCardTrue: () => void;
}
const AddCardForm: React.FC<AddCardFormProps> = ({
  addCard,
  setAddCardTrue,
}) => {
  const [bankAccounts, setBankAccounts] = useState<MyBankData[] | null>(null);
  const [cardData, setCardData] = useState<CardData>({
    card_number: "",
    card_name: "",
    card_close_day: 0,
    card_due_day: 0,
    card_limit: 0,
    bank_account_id: 0,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCardData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCardData((prevState) => ({
      ...prevState,
      bank_account_id: +event.target.value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    };
    fetch("/api/cards", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    setAddCardTrue();
  }
  console.log("bankAccounts", cardData);

  useEffect(() => {
    fetch("/api/banks")
      .then((response) => response.json())
      .then((data) => {
        setBankAccounts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [addCard]);
  const [bankAccountOptions, setBankAccountOptions] = useState<JSX.Element>(
    <option value="">Nenhum banco cadastrado</option>
  );

  useEffect(() => {
    let bankAccountOptions: JSX.Element | null = null;
    if (bankAccounts) {
      bankAccountOptions = (
        <>
          {bankAccounts.map((bankAccount) => (
            <option key={bankAccount.id} value={bankAccount.id}>
              {bankAccount.bank_name}
            </option>
          ))}
        </>
      );
    } else {
      bankAccountOptions = <option value="">Nenhum banco cadastrado</option>;
    }

    setBankAccountOptions(bankAccountOptions);
  }, [addCard, bankAccounts]);

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="card_number">Card Number</label>
        <input
          type="text"
          name="card_number"
          id="cardNumber"
          onChange={handleChange}
        />
        <label htmlFor="card_name">Nome do cartão</label>
        <input
          type="text"
          name="card_name"
          id="cardCloseDay"
          onChange={handleChange}
        />
        <label htmlFor="card_close_day">Fechamento da Fatura</label>
        <input
          type="number"
          name="card_close_day"
          id="cardDueDay"
          onChange={handleChange}
        />
        <label htmlFor="card_due_day">Vencimento da Fatura</label>
        <input
          type="number"
          name="card_due_day"
          id="cardLimit"
          onChange={handleChange}
        />
        <label htmlFor="card_limit">Limite do Cartao</label>
        <input
          type="number"
          name="card_limit"
          id="bankAccountNumber"
          onChange={handleChange}
        />
        <label htmlFor="bank_account_number">Banco</label>
        <select name="bank_account_id" id="" onChange={handleSelectChange}>
          {bankAccountOptions}
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddCardForm;
