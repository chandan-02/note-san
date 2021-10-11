import type { NextComponentType } from 'next';
import Image from 'next/image';
import about_bg from '../public/about_bg.jpg';
import useDimension from '../helper/getDimension';

const AboutHero : NextComponentType= () => {

    const[width,height] = useDimension();
    
    return (
        <div className="overflow-hidden relative">
            <div className="object-cover top-0 left-0">
                <Image src={about_bg} layout="responsive" height={width < 768 ? "900" : "750"} alt="bg" objectFit="cover" />
            </div>
            <div className="absolute inset-x-0 text-center" style={{top:'35%'}}>
                <h1 className={"font-poppins text-2xl font-bold md:text-6xl text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-footer_bg filter drop-shadow"}>About
                    &nbsp;  ノートさん</h1>
                <p className="font-poppins pt-2 text filter drop-shadow text-white md:text-lg">A note taking and sharing platform.</p>
            </div>
        </div>
    )
}

export default AboutHero;