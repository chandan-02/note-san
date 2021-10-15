import { FC } from 'react';
import styles from '../styles/GitRepo.module.css';
import Image from 'next/image';
import useDimension from '../helper/getDimension';
import Link from 'next/link';
import IProps from '../interface/git';

const GitRepo: FC<IProps> = ({ gitInfo }) => {

    const [width, height] = useDimension();

    return (
        <div className={styles.container}>
            <div className={styles.box}>

                <div className={styles.left}>
                    {/* eslint-disable-next-line @next/next/no-img-element*/}
                    <img className="rounded h-20 w-20 md:h-40 md:w-40" src={gitInfo.userImg} alt="git_avatar" />
                </div>

                <div className={styles.right}>
                    <div className="flex items-center cursor-pointer">
                        <Image src="/repo.svg" alt="repo_svg" height="18" width="18" />
                        <Link href="https://github.com/chandan-02/note-san" passHref>
                            <h1 className="pl-2 font-poppins font-semibold text-base md:text-xl py-1">{gitInfo.name}</h1>
                        </Link>
                    </div>
                    <Link href="https://github.com/chandan-02/note-san" passHref>

                        <h1 className="md:pl-1 font-poppins text-xs md:text-base py-1 cursor-pointer">{gitInfo.description}</h1>
                    </Link>

                    <div className="md:pl-1 flex items-center py-1">
                        <Image src="/star.svg" alt="repo_svg" height={width < 768 ? "18" : "23"} width={width < 768 ? "18" : "23"} />
                        <Link href="https://github.com/chandan-02/note-san" passHref>
                            <h1 className="pl-1 md:pl-2 font-semibold text-sm md:text-base md:pt-1 text-gray-600 font-poppins pr-5 cursor-pointer">{gitInfo.stars}</h1>
                        </Link>
                        <Link href="https://github.com/chandan-02/note-san " passHref>
                            <div className="h-3 md:h-4 w-3 md:w-4 rounded-full  bg-m_dark_blue cursor-pointer"></div>
                        </Link>
                        <Link href="https://github.com/chandan-02/note-san" passHref>
                            <h1 className="pl-2 font-poppins text-xs md:text-base cursor-pointer">{gitInfo.lang}</h1>
                        </Link>
                    </div>
                    {
                        width > 768 && (

                            <div className="flex flex-wrap items-center py-2">
                                {
                                    gitInfo.tags.map((tag) => {
                                        return <h1 className="font-poppins text-sm px-2 bg-blue-100 border border-m_dark_blue rounded-full py-1 mx-2" key={tag}>{tag}</h1>
                                    })
                                }
                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    )
}

export default GitRepo;