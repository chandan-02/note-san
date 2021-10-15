import type { NextPage } from 'next';
import styles from '../../styles/AddNote.module.css';
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import LoginPls from '../../components/loginpls';
import Visible from '../../components/visibilityBtn';
import SaveDelete from '../../components/saveDeleteBtn';
import ChooseColor from '../../components/chooseNoteColor';
import useAuth from '../../helper/useAuth';
import Image from 'next/image';
const axios = require('axios').create({
    baseURL: process.env.API_BASE_URL
})

interface ILoad {
    normal: boolean;
    noteLoading: boolean;
}

const NewNote: NextPage = () => {
    const [session, loading] = useSession();
    const [user, user_img] = useAuth(session, loading);
    const [isPublic, setIsPublic] = useState<string>('');
    const router = useRouter();

    const [color, setColor] = useState<string>('m_light_orange');
    const [visible, setVisible] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    const [load, setLoad] = useState<ILoad>({ normal: false, noteLoading: false })

    const colorArr: Array<string> = ['m_purple', 'm_dark_orange', 'm_lime', 'm_blue', 'm_light_orange']

    const handleTextChange = (e: any) => {
        e.preventDefault();
        setText(e.target.value);
    }

    const handleDelete = async() => {
        const { user, addEditNote, db_user } = router.query;
        if (router.query.addEditNote == 'draft') {
            setText('');
        } else {
            try {
                setLoad({...load,normal:true})
                const response = typeof(user)=='string' && await axios.delete('/api/private/del', {
                    data: {
                        id: addEditNote,
                        db_user: db_user,
                        user:isPublic == 'public' ? user : null
                    }
                })   
                if (response.data.msg == 'public_note_del' || response.data.msg == 'private_note_del') {
                    console.log(response.data.msg);
                    setLoad({...load,normal:false});
                    setText('');
                    router.push('/dashboard');
                } 
            } catch (error) {
                setLoad({...load,normal:false});
                alert('something went wrong.');
            } 
        }
    }

    const handleEdit = async () => {
        const { user, addEditNote, db_user } = router.query;
        if (session && !loading && !load.noteLoading) {
            if (isPublic == 'public') {
                setLoad({ ...load, normal: true })
                try {
                    const resPublic = user && addEditNote && await axios.put('/api/public/edit', {
                        id: addEditNote,
                        shared_by: user,
                        note: text,
                        color: color,
                    })
                    if (resPublic.data.success) {
                        console.log(resPublic.data.msg)
                        setLoad({ ...load, normal: false })
                        setText('');
                        router.push('/dashboard')
                    }
                } catch (error) {
                    setLoad({ ...load, normal: false })
                    alert('Something went wrong')
                }
            }
            if (isPublic == 'private') {
                setLoad({ ...load, normal: true })
                try {
                    const resPrivate = db_user && addEditNote && await axios.put('/api/private/edit', {
                        id: addEditNote,
                        db_user: db_user,
                        note: text,
                        color: color,
                    })
                    if (resPrivate.data.success) {
                        console.log(resPrivate.data.msg)
                        setLoad({ ...load, normal: false })
                        setText('');
                        router.push('/dashboard')
                    }
                } catch (error) {
                    setLoad({ ...load, normal: false })
                    alert('Something went wrong')
                }
            }
        }
    }

    const handleSave = async () => {
        if (text != '') {
            if (router.query.action == 'add' && router.query.db_user) {
                setLoad({ ...load, normal: true })
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
                            setLoad({ ...load, normal: false })
                            setText('');
                            router.push('/dashboard')
                        }
                    } catch (error) {
                        setLoad({ ...load, normal: false })
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
                                setLoad({ ...load, normal: false })
                                setText('');
                                router.push('/dashboard')
                            }
                        } catch (error) {
                            setLoad({ ...load, normal: false })
                            alert('Something went wrong')
                        }
                    }
                }
            } else {
                alert('action : add not found, please go back & try again ')
            }
        } else {
            alert('pls enter some text')
        }
    }

    useEffect(() => {
        const { user, addEditNote, db_user } = router.query;
        const getNote = async () => {
            if (router.query.user == "") {
                setIsPublic('private')
                setLoad({ ...load, noteLoading: true })
                try {
                    const resPrivate = db_user != undefined && addEditNote != undefined && await axios.get('/api/private/note', {
                        params: {
                            id: addEditNote,
                            db_user: db_user
                        }
                    })
                    setText(resPrivate.data.note.note);
                    setColor(resPrivate.data.note.color);
                    setLoad({ ...load, noteLoading: false });
                } catch (error) {
                    setLoad({ ...load, noteLoading: false })
                }

            } else {
                setIsPublic('public')
                setLoad({ ...load, noteLoading: true })
                try {
                    const resPublic = user != undefined && addEditNote != undefined && await axios.get('/api/public/note', {
                        params: {
                            id: addEditNote,
                            user: user
                        }
                    })
                    setText(resPublic.data.note.note);
                    setColor(resPublic.data.note.color);
                    setLoad({ ...load, noteLoading: false });
                } catch (error) {
                    setLoad({ ...load, noteLoading: false })
                }
            }

            isPublic == 'public' && setVisible(true);
        }

        getNote();

    }, [router, isPublic])

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
                    <div className={`flex my-${router.query.addEditNote == 'draft' ? 3 : 0} items-center`} >
                        {
                            router.query.addEditNote == 'draft' ?
                                <>
                                    <h1 className="font-poppins text-base md:text-lg">Visibilty :</h1>&nbsp;
                                    <Visible handler={setVisible} visible={visible} />
                                </>
                                :
                                null
                        }
                        {
                            !load.noteLoading ? null :
                                <div className="flex my-3 items-center">
                                    <Image src='/load.svg' alt="load_svg" height="40" width="40" />
                                    <h1 className="font-poppins">loading note</h1>
                                </div>
                        }
                    </div>

                    {/* Submit & delete buttons*/}
                    <div className="flex my-3 items-center">
                        {
                            !load.normal ?
                                <>
                                    <SaveDelete handler={router.query.addEditNote == 'draft' ? handleSave : handleEdit} type="save" />
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