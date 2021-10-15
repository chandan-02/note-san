import type { NextPage } from 'next';
import styles from '../../styles/AddNote.module.css';
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import LoginPls from '../../components/loginpls';
import Visible from '../../components/visibilityBtn';
import SaveDelete from '../../components/saveDeleteBtn';
import ChooseColor from '../../components/chooseNoteColor';
import useAuth from '../../helper/useAuth';
import Image from 'next/image';
const axios = require('axios').create({
    baseURL: 'http://localhost:3000'
})

const NewNote: NextPage = () => {
    const [session, loading] = useSession();
    const [user, user_img] = useAuth(session, loading);
    const router = useRouter();
    const [color, setColor] = useState<string>('m_light_orange');
    const [load, setLoad] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(false)
    const [text, setText] = useState<string>('');

    const colorArr: Array<string> = ['m_purple', 'm_dark_orange', 'm_lime', 'm_blue', 'm_light_orange']

    const handleTextChange = (e: any) => {
        e.preventDefault();
        setText(e.target.value);
    }

    const handleDelete = () => {
        setText('')
    }

    const handleEdit = async () => {
        
    }

    const handleSave = async () => {
        if (text != '') {
            if (router.query.action == 'add' && router.query.db_user) {
                setLoad(true)
                if (visible) {
                    try {
                        const res = await axios.post('/api/public/add/', {
                            content: text,
                            color: color,
                            user: user,
                            user_img: user_img
                        })
                        if (res.data.success) {
                            console.log(res.data.msg)
                            setLoad(false)
                            setText('');
                            router.push('/dashboard')
                        }
                    } catch (error) {
                        setLoad(false)
                        alert('Something went wrong')
                    }
                }
                else {
                    if (session && !loading) {
                        try {
                            const res = await axios.post('/api/private/add/', {
                                content: text,
                                color: color,
                                user: router.query.db_user
                            })
                            if (res.data.success) {
                                console.log(res.data.msg)
                                setLoad(false)
                                setText('');
                                router.push('/dashboard')
                            }
                        } catch (error) {
                            setLoad(false)
                            alert('Something went wrong')
                        }
                    }
                }
            }else{
                alert('action : add not found, please go back & try again ')
            }
        } else {
            alert('pls enter some text')
        }
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
                    <div className={`my-3 border-2 p-5 rounded-md flex items-center`}>
                        <h1 className="font-poppins text-base md:text-lg">Select note color : </h1>&nbsp;
                        {
                            colorArr.map((colour) => {
                                return (<ChooseColor eachColor={colour} stateColor={color} handler={setColor} key={colour} />)
                            })
                        }
                    </div>

                    {/* Note text area */}
                    <textarea
                        className={`bg-${color} transition-all my-3 rounded-md p-5 font-poppins outline-none placeholder-gray-600`}
                        value={text}
                        rows={10} placeholder="enter some text ..." onChange={(e) => handleTextChange(e)}>
                    </textarea>

                    {/* Set visibilty*/}
                    <div className="flex my-3 items-center">
                        <h1 className="font-poppins text-base md:text-lg">Visibilty -- </h1>&nbsp;
                        <Visible handler={setVisible} visible={visible} />
                    </div>

                    {/* Submit & delete buttons*/}
                    <div className="flex my-3 items-center">
                        {
                            !load ?
                                <>
                                    <SaveDelete handler={handleSave} type="save" />
                                    <SaveDelete handler={handleDelete} type="del" />
                                </>
                                :
                                <div className="flex  items-center">
                                    <Image src='/load.svg' alt="load_svg" height="50" width="50" />
                                    <h1 className="font-poppins"> Processing </h1>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
    return <LoginPls loading={loading} text={loading ? "Please wait, verifying session." : "Hello User, please login to view dashboard."} />
}

export default NewNote;