/* eslint-disable @next/next/no-img-element */
export default function Card() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border border-emerald-800/60 bg-gradient-to-br from-[#11221d] via-[#163129] to-[#0d1a16] text-white shadow-2xl shadow-emerald-950/40">
      <img src="https://picsum.photos/301" alt="" className="h-44 w-full object-cover object-center" />
      <div className="flex flex-col justify-between space-y-8 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide text-emerald-300">Lorem</h2>
          <p className="text-sm leading-6 text-emerald-100/80">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio tempora ipsum soluta amet corporis accusantium aliquid consectetur eaque!</p>
        </div>
        <button type="button" className="flex w-full items-center justify-center rounded-md bg-emerald-600 p-3 font-semibold tracking-wide text-emerald-50 transition hover:bg-emerald-500">
          Read more
        </button>
      </div>
    </div>
  );
}
