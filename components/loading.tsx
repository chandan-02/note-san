import type {NextComponentType} from 'next/types';

const Loading: NextComponentType = () => {
    return (
        <div className="flex justify-center items-center transition-all bg-black px-8 py-2 rounded-lg cursor-pointer mx-7 m-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/loading.svg" alt="loading" className="h-5 w-5" />
            <h1 className="pl-3 text-white font-poppins font-semibold">loading</h1>
        </div>
    )
}

export default Loading;