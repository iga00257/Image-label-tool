interface Props {
  styleClass: string
  children?: React.ReactNode
}
function Subtitle ({ styleClass, children }: Props) {
  return (
          <div className={`text-xl font-semibold ${styleClass}`}>{children}</div>
  )
}

export default Subtitle
