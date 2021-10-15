import { FC } from 'react';
import {IChooseNoteColorProps } from '../interface/common';

const ChooseColor:FC<IChooseNoteColorProps> = ({eachColor,stateColor,handler}) => {
    return (
        <div key={eachColor}
            className={`h-5 w-5 bg-${eachColor} cursor-pointer rounded-full mx-1 md:mx-2 ring-gray-500 ring-offset-2 transition-all ${stateColor == eachColor && 'ring-2'}`}
            onClick={() => handler(eachColor)}></div>
    )
}

export default ChooseColor;