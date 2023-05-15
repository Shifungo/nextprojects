import { useState } from "react";
import React from "react";

interface BankFormProps {
  bankName: string;
}

const AddBankForm: React.FC = () => {
  const [bankName, setBankName] = useState({
    bankName: "",
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setBankName((prevState) => ({ ...prevState, [name]: value }));
    console.log(bankName);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const bankNameEvent = (event.target as HTMLFormElement).bankName.value;
    setBankName({ bankName: bankNameEvent });
    console.log(bankName);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bankName),
    };
    fetch("/api/banks", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="bankName">Bank Name</label>
        <input
          type="text"
          name="bankName"
          id="bankName"
          onChange={onChange}
          required
        />
      </form>
    </div>
  );
};

export default AddBankForm;
