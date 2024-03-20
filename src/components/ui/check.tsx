import { CircleAlert, CircleCheck } from 'lucide-react';

export const Check = ({ isCheck }: {isCheck: boolean | undefined}) => {
  switch (isCheck) {
    case true:
      return <CircleCheck className="w-6 h-6 absolute top-1/2 -translate-y-1/2 right-3 z-10 fill-rose-500"/>
    case false:
      return <CircleAlert className="w-6 h-6 absolute top-1/2 -translate-y-1/2 right-3 z-10 fill-rose-500"/>
    default:
      return <></>
  }
}
