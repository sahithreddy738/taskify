
interface ListWrapperProps {
    children:React.ReactNode;
}

const ListWrapper = ({children}:ListWrapperProps) => {
  return (
    <li className="h-full w-[272px] select-none">
        {children}
    </li>
  )
}

export default ListWrapper