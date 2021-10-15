import { FC } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import {IVisibilityBtnProps} from '../interface/common';

const Visible: FC<IVisibilityBtnProps> = ({ visible, handler }) => {
    if (visible) {

        return (
            <div className="flex bg-black px-4 py-2 rounded items-center cursor-pointer transition-all" onClick={() => handler(!visible)}>
                <h1 className="font-poppins text-white transition-all text-sm md:text-base ">Public</h1>
                <EyeIcon className="ml-2 h-5 w-5 text-white transition-all " />
            </div>
        )
    }
    return (
        <div className="flex bg-black px-5 py-2 rounded items-center cursor-pointer transition-all" onClick={() => handler(!visible)}>
            <h1 className="font-poppins text-white transition-all text-sm md:text-base ">Private</h1>
            <EyeOffIcon className="ml-2 h-5 w-5 text-white transition-all " />
        </div>
    )
}

export default Visible;