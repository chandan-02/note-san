import { FC } from 'react';
import { useRouter } from 'next/router';

interface IProps {
  url: string
}

const UserIcon: FC<IProps> = ({ url }) => {
  const route = useRouter();
 
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="h-9 w-9 mx-7 rounded-full ring-4 ring-m_purple cursor-pointer transform transition-all hover:scale-105"
        src={url} alt="user"
        onClick={()=>route.push('/auth')}
      />
    </>
  )
}

export default UserIcon;