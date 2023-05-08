import styles from "@/styles/Dayform.module.css";
import { useState, useRef, useEffect } from "react";
import DayAtividadesForm from "./DayAtividadesForm";
import Atividades from "./Atividades";

interface DayformProps {
  date: string;
  month: string;
}

const Dayform: React.FC<DayformProps> = ({ date, month }) => {
  const [removeAtividade, setRemoveAtividade] = useState(Boolean);

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

  return (
    <div className={styles.dayFormWrapper}>
      <h3>Atividades</h3>
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
    </div>
  );
};

export default Dayform;
