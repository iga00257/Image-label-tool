import reactIcon from '../../assets/react.svg'

interface Image {
  src?: string
  alt?: string
  link?: string
}
interface User {
  id: string
  name: string
  pictureSrc: string
}
interface Props {
  teamMembers?: User[]
  displayLimit?: number
  containerStyle?: string
}

const Image = ({ src, alt, link }: Image) => {
  const handleOnError = (e) => {
    console.log('error')
    e.target.src = reactIcon
  }
  return (
        <>
        {src
          ? <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={'123465'} alt={alt} onError={handleOnError}/>
          : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 border-2 bg-white border-white rounded-full dark:border-gray-800">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>}
        </>
  )
}
const StackAvatar = ({ teamMembers = [], displayLimit = 2, containerStyle = '' }: Props) => {
  return (<div className={`flex -space-x-4 ${containerStyle}`}>
        {teamMembers.map((member: User, index) => {
          if (index < displayLimit) {
            return <Image src={member.pictureSrc} />
          }
          if (index === displayLimit) {
            return <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+{teamMembers.length - displayLimit}</a>
          }
        })}

</div>)
}
export default StackAvatar
