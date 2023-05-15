import styles from "@/styles/Dayform.module.css";
import { useState, useRef, useEffect } from "react";
import DayAtividadesForm from "./addThings/AddAtividadesForm";
import Atividades from "./Atividades";
import AddBankForm from "./addThings/AddBankForm";
import AddCardForm from "./addThings/AddCardForm";

interface DayformProps {
  date: string;
  month: string;
}

const Dayform: React.FC<DayformProps> = ({ date, month }) => {
  const [addCard, setAddCard] = useState<Boolean>(false);
  //plus Ativiade handling
  const [addAtividade, setAddAtividade] = useState(Boolean);
  const formRef = useRef<HTMLDivElement>(null);

  const closeOpenAddForm = (event: MouseEvent) => {
    const targetNode = event.target as Node;
    if (
      formRef.current &&
      addAtividade &&
      !formRef.current.contains(targetNode)
    ) {
      console.log("Clicked outside the form");
      setAddAtividade(false);
    }
  };

  function plusAtividade() {
    setAddAtividade(true);
  }
  function closeAtividade() {
    setAddAtividade(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenAddForm);
  }),
    [addAtividade, closeAtividade];

  console.log(formRef);

  function subtractAtividade() {}

  const dateClicked = date;

  let showDayAtividadeForm = <div></div>;
  if (addAtividade) {
    console.log("true");
    showDayAtividadeForm = (
      <div ref={formRef} className={styles.backgroundEventListener}>
        <div className={styles.floatingForm}>
          <DayAtividadesForm
            date={dateClicked}
            month={month}
            closeAtividade={closeAtividade}
          />
        </div>
      </div>
    );
  } else {
    showDayAtividadeForm = <div></div>;
  }

  function setAddCardTrue() {
    setAddCard(!addCard);
  }

  return (
    <div className={styles.dayFormWrapper}>
      <h3>Atividades</h3>
      <button onClick={setAddCardTrue}>AddCard</button>
      <div className={styles.dayClickedactivities}>
        <div>
          <p className={styles.DayTitle}>{dateClicked}</p>
        </div>
        <div>
          <button onClick={plusAtividade}>+ Atividade</button>
          <button onClick={subtractAtividade}> - Atividade</button>
        </div>
        <div>
          <Atividades date={dateClicked} month={month} />
        </div>
      </div>
      {showDayAtividadeForm}
      <div>
        <AddBankForm />
        <div>
          <p>cartao</p>
        </div>
        {addCard ? (
          <AddCardForm addCard={addCard} setAddCardTrue={setAddCardTrue} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Dayform;
