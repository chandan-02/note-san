import type { NextPage } from 'next';
import styles from '../../styles/About.module.css';
import Image from 'next/image';
import AboutHero from '../../components/aboutHeroSection';
import useDimension from '../../helper/getDimension';
import {useState,useEffect} from 'react';
import axios from 'axios';

interface IPhoto {
  name: string;
  h: number;
  w: number;
  hMobile:number;
  wMobile:number;
}

const About: NextPage = () => {
  
  const [git,setGit] = useState()
  const [width,height] = useDimension();

  const img: Array<IPhoto> = [
    { name: 'nextjs', h: 80, w: 90 , hMobile:50,wMobile:55},
    { name: 'typescript', h: 70, w: 70 ,hMobile:35,wMobile:35},
    { name: 'tailwind', h: 60, w: 170 ,hMobile:30,wMobile:85},
    { name: 'nodejs', h: 80, w: 80 ,hMobile:40,wMobile:40},
    { name: 'postgresql', h: 70, w: 70 ,hMobile:40,wMobile:40},
  ];
  useEffect(() => {
    const getInfo = async () => {
      try { 
        const result = await axios.get('/api/git');
        result && setGit(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    getInfo();
  })
  return (
    <div className={styles.container}>
      <AboutHero />
      <h1 className={styles.tech}>Tech&nbsp; <p className="text-pink-600">Stack</p></h1>

      <div className={styles.box}>
        <div className="flex flex-wrap flex-row transition-all justify-center items-center ">
          {
            img.map((image) => {
              return (
                <div className="p-7 md:p-16" key={image.name}>
                  <Image src={`/logo/${image.name}.svg`} height={width > 768 ? image.h : image.hMobile} width={width > 768 ? image.w : image.wMobile} alt="logo" />
                </div>
              )
            })
          }
        </div>
      </div>

      <div className={styles.bottom}>
        <h1 className={styles.tech}>Check Out </h1>
          <div className={styles.gitProfile}>
            <h1>something</h1>
          </div>
      </div>
    </div>
  )
}

export default About;
