import { FC } from 'react';
import { CheckIcon, TrashIcon } from '@heroicons/react/solid';

interface IProps {
    type: string,
    handler(): void
}

const SaveDelete: FC<IProps> = ({ type, handler }) => {
    if (type == "del") {
        return (
            <div className="ml-2 flex bg-pink-700 px-5 py-2 rounded items-center cursor-pointer transition-all filter hover:shadow-md" 
            onClick={() => handler()}>
                <TrashIcon className="mr-2 h-5 w-5 text-white transition-all " />
                <h1 className="font-poppins text-white transition-all text-sm md:text-base ">delete all</h1>
            </div>
        )
    }
    return (
        <div className="flex bg-m_dark_blue px-5 py-2 rounded items-center cursor-pointer transition-all filter hover:shadow-md" 
        onClick={() => handler()}>
            <CheckIcon className="mr-2 h-5 w-5 text-gray-800 transition-all " />
            <h1 className="font-poppins text-gray-800 transition-all text-sm md:text-base ">save changes</h1>
        </div>
    )
}

export default SaveDelete;