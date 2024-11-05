import Image from "next/image";

const Button = ({ type, title, icon, variant, full, size = "small", onClick}) => {
  return (
    <button
      type={type}
      className={`flexCenter gap-3 rounded-full border ${variant} ${full && 'w-full'} ${size === "big" ? "h-[56px]" : "h-[38px]"}`}
      onClick={onClick}
    >
      {icon && <Image src={icon} alt={title} width={24} height={24}/>}
      <label className='semibold-16 whitespace-nowrap cursor-pointer'>{title}</label>
    </button>
  )
}

export default Button