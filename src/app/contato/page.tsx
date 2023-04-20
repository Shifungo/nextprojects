const contato = () => {
  return (
    <div className="w-screen h-screen flex flex-col   bg-blue-700">
      <div className="flex flex-col justify-center flex-wrap content-center bg-yellow-500 h-screen">
        <label className=" ">me mande um email</label>
        <button className=" bg-zinc-500">email</button>
      </div>
      <div className="flex flex-col justify-center flex-wrap content-center bg-green-500 h-screen">
        <label htmlFor=""> ou conecte-se pelo linkedin</label>
        <button className="  bg-orange-600">linkedin</button>
      </div>
    </div>
  );
};
export default contato;
