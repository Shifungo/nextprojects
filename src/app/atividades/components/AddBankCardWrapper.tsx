import AddCardForm from "./addThings/AddCardForm";
import AddBankForm from "./addThings/AddBankForm";
import { useState } from "react";
export default function AddBankCardWrapper() {
  const [addCard, setAddCard] = useState<Boolean>(false);

  function setAddCardTrue() {
    setAddCard(!addCard);
  }

  return (
    <div>
      <button onClick={setAddCardTrue}>AddCard</button>
      <div>
        {addCard ? (
          <AddCardForm addCard={addCard} setAddCardTrue={setAddCardTrue} />
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <AddBankForm />
      </div>
    </div>
  );
}
