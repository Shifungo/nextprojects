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
      <div className="bg-[#3E2424]  rounded-3xl m-2 ">
        <button className="m-2" onClick={setAddCardTrue}>
          +Bank
        </button>
      </div>

      <div>
        {addCard ? (
          <AddBankForm addCard={addCard} setAddCardTrue={setAddCardTrue} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
