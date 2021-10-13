import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from '../../styles/About.module.css';
import useDimension from '../../helper/getDimension';
import AboutHero from '../../components/aboutHeroSection';
import GitRepo from '../../components/gitRepo';

interface IPhoto {
  name: string;
  h: number;
  w: number;
  hMobile: number;
  wMobile: number;
}

const About: NextPage = () => {

  const [git, setGit] = useState({
    data: {
      name: '',
      description: '',
      userImg: '',
      tags: [], stars: 0, lang: ''
    }
  })
  const [width, height] = useDimension();

  const img: Array<IPhoto> = [
    { name: 'nextjs', h: 80, w: 90, hMobile: 50, wMobile: 55 },
    { name: 'typescript', h: 70, w: 70, hMobile: 35, wMobile: 35 },
    { name: 'tailwind', h: 60, w: 170, hMobile: 30, wMobile: 85 },
    { name: 'nodejs', h: 80, w: 80, hMobile: 40, wMobile: 40 },
    { name: 'postgresql', h: 70, w: 70, hMobile: 40, wMobile: 40 },
  ];
  useEffect(() => {
    const getInfo = async () => {
      try {
        const result = await axios.get('/api/git');
        result && setGit(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getInfo();
  },[])

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
        <h1 className={styles.tech}>Github&nbsp; <p className="text-m_dark_blue">Repository </p></h1>
        <GitRepo gitInfo={git.data} />
      </div>

      <h1 className={styles.tech}>Note</h1>
          <div className="flex items-center justify-center pb-20 mx-5 md:mx-0 text-center">
              <h1 className="font-poppins text-sm md:text-base p-5 bg-red-100 border-2 rounded border-red-500"> DB is being hosted on Heroku with free dyno; so, there can/will be a delay.</h1>
          </div>
    </div>
  )
}

export default About;
