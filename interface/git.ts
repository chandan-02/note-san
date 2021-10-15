interface IGit {
    name: string,
    userImg: string;
    description: string;
    lang: string;
    stars: number,
    tags: Array<string>,
}

interface IProps {
    gitInfo: IGit,
}

export default IProps;