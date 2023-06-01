import styles from "@/styles/Dayform.module.css";
import { useState, useRef, useEffect } from "react";
import DayAtividadesForm from "./addThings/AddAtividadesForm";
import Atividades from "./Atividades";
import AddBankCardWrapper from "./AddBankCardWrapper";

interface DayformProps {
  date: string;
  month: string;
}

const Dayform: React.FC<DayformProps> = ({ date, month }) => {
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

  return (
    <div className={styles.dayFormWrapper}>
      <div className={styles.dayClickedactivities}>
        <div className={styles.DayTitle}>
          <p className={styles.DayTitleLetter}> {dateClicked}</p>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-[#3E2424]  rounded-3xl m-2 "
            onClick={plusAtividade}
          >
            + Atividade
          </button>
          <AddBankCardWrapper />
        </div>
        <div>
          <Atividades date={dateClicked} month={month} />
        </div>
      </div>
      {showDayAtividadeForm}
    </div>
  );
};

export default Dayform;
