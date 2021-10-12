const axios = require('axios').create({
    baseURL: 'https://api.github.com/repos',
    headers: {
        Authorization:process.env.GIT_ACCESS_TOKEN,
        Accept: "Accept: application/vnd.github.v3+json"
    }
})

interface IGit {
    name:string,
    userImg: string;
    description: string;
    lang: string;
    stars: number,
    tags: Array<string>,
}

const getInfo = async (): Promise<any> => {
    const result = await axios.get('/chandan-02/note-san');
    const git: IGit = {
        name:'note-san',
        userImg: result.data.owner.avatar_url,
        description: result.data.description,
        lang: result.data.language,
        stars: result.data.stargazers_count,
        tags: result.data.topics
    }
    return git;
}

export default await getInfo();