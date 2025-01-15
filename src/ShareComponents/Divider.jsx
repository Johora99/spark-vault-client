

export default function Divider({text}) {
  return (
     <div className="relative flex items-center my-5">
      <div className="flex-grow border-t-[2px] border-appleGreen"></div>
      <span className="mx-4 text-white font-semibold">{text}</span>
    <div className="flex-grow border-t-[2px] border-appleGreen"></div>
    </div>
  )
}
