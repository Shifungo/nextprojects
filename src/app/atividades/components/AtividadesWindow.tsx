export default function AtividadesWindow(id: { id: string }) {
  async function fetchAtividades() {
    const res = await fetch(`/api/atividadeHandler/getAtividades/?id=${id}`);
    const text = await res.text();

    const json = JSON.parse(text);
    console.log("JSON data:", json);
  }
  return <div></div>;
}
