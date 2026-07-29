import Card from "./components/card"

function App() {
  return (
    <div className="min-h-screen bg-[#07110f] px-4 py-8 flex flex-col items-center justify-center">
      <h2 className="text-emerald-400 font-bold text-2xl my-4">
        React with tailwind and props
      </h2>
      <Card />
    </div>
  )
}

export default App
