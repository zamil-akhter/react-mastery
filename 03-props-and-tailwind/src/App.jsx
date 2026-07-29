import Card from "./components/card";

function App() {
  return (
    <>
      <h2 className="text-emerald-400 font-bold text-2xl my-4">React with tailwind and props</h2>
      <div className="min-h-screen bg-[#07110f] px-4 py-8 flex items-center justify-between gap-4 flex-wrap">
        <Card fullName="Zamil Akhter" btnText="Visit me"/>
        <Card fullName="Tanveer Azam"/>
        <Card fullName="Irfan Perwez"/>
      </div>
    </>
  );
}

export default App;
