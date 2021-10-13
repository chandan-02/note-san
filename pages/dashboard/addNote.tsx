import type { NextPage } from 'next';
import styles from '../../styles/AddNote.module.css';
import { ArrowNarrowLeftIcon, EyeIcon, EyeOffIcon, CheckIcon, TrashIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import LoginPls from '../../components/loginpls';
import Visible from '../../components/visibilityBtn';

const NewNote: NextPage = () => {

    const [session, loading] = useSession();
    const router = useRouter();

    const [color, setColor] = useState<string>('m_light_orange');
    const [icon, setIcon] = useState<boolean>(false)
    const [text, setText] = useState<string>('');

    const colorArr: Array<string> = ['m_purple', 'm_dark_orange', 'm_lime', 'm_blue', 'm_light_orange']
    const handleTextChange = (e: any) => {
        e.preventDefault();
        setText(e.target.value);
    }

    const handleDelete = () => {
        setText('')
    }
    if (session && !loading) {
        return (
            <div className={styles.container}>
                <div className={styles.box}>

                    <div className="flex items-center cursor-pointer" onClick={() => router.push('/dashboard')}>
                        <ArrowNarrowLeftIcon className="h-10 w-10 text-blue-500" />
                        <h1 className="pl-2 font-poppins font-semibold text-xl">Go back </h1>
                    </div>
                {/* Note color selection*/}
                    <div className={`my-3 border-2 p-5 rounded-md`}>
                        <div className={styles.colorSelect}>
                            <h1 className="font-poppins text-base md:text-lg">Select note color : </h1>&nbsp;
                            {
                                colorArr.map((colour) => {
                                    return (<div key={colour}
                                        className={`h-5 w-5 bg-${colour} cursor-pointer rounded-full mx-1 md:mx-2 ring-gray-500 ring-offset-2 transition-all ${color == colour && 'ring-2'}`}
                                        onClick={() => {
                                            setColor(colour)
                                        }}></div>)
                                })
                            }

                        </div>
                    </div>

                    {/* Note text area */}
                    <textarea
                        className={`bg-${color} transition-all my-3 rounded-md p-5 font-poppins outline-none placeholder-gray-600`}
                        value={text}
                        rows={10} placeholder="enter some text ..." onChange={(e) => handleTextChange(e)}>
                    </textarea>

                    {/* Set visibilty*/}
                    <div className="flex py-3 items-center">
                        <h1 className="font-poppins text-base md:text-lg">Visibilty -- </h1>&nbsp;
                        <Visible handler={setIcon} visible={icon} />
                    </div>
                    
                    {/* Submit & delete buttons*/}
                    <div className="flex py-3 items-center">
                        <div className="flex bg-m_dark_blue px-5 py-2 rounded items-center cursor-pointer transition-all filter hover:shadow-md" onClick={() => null}>
                            <CheckIcon className="mr-2 h-5 w-5 text-gray-800 transition-all " />
                            <h1 className="font-poppins text-gray-800 transition-all text-sm md:text-base ">save changes</h1>
                        </div>
                        <div className="ml-2 flex bg-pink-700 px-5 py-2 rounded items-center cursor-pointer transition-all filter hover:shadow-md" onClick={() => handleDelete()}>
                            <TrashIcon className="mr-2 h-5 w-5 text-white transition-all " />
                            <h1 className="font-poppins text-white transition-all text-sm md:text-base ">delete all</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return <LoginPls loading={loading} text={loading ? "Please wait, verifying session." : "Hello User, please login to view dashboard."} />
}

export default NewNote;