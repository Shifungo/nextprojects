import { useState, useRef, useEffect } from "react";
import AddCardForm from "./AddCardForm";

interface AddCardFormProps {
  addCard: Boolean;
  setAddCardTrue: () => void;
}

const AddBankForm: React.FC<AddCardFormProps> = ({
  addCard,
  setAddCardTrue,
}) => {
  const [bankName, setBankName] = useState({
    bankName: "",
  });
  const [addCartao, setAddCartao] = useState<Boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

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
  function plusCartao() {
    setAddCartao(!addCartao);
  }

  const closeOpenAddForm = (event: MouseEvent) => {
    const targetNode = event.target as Node;
    if (formRef.current && !formRef.current.contains(targetNode)) {
      setAddCardTrue();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", closeOpenAddForm);
  }),
    [addCard];

  return (
    <div className=" fixed inset-0 flex items-center justify-center z-50">
      <div ref={formRef} id="essaDiv">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col bg-[#3E2424] rounded-3xl text-[#e29898]"
        >
          <div className=" m-8">
            <h2>
              <span className="text-2xl">Add Bank</span>
            </h2>
          </div>
          <div className="m-8">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              name="bankName"
              id="bankName"
              className="m-2"
              onChange={onChange}
              required
            />
          </div>
          <div className="m-8">
            <button type="button" onClick={plusCartao}>
              ADDCARD
            </button>
            {addCartao ? (
              <AddCardForm addCard={addCard} setAddCardTrue={setAddCardTrue} />
            ) : (
              <div></div>
            )}
          </div>
          <div className="flex flex-row-reverse m-8">
            <button>OK</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBankForm;
