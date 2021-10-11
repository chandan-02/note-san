const axios = require('axios').create({
    baseURL: 'https://api.github.com/repos',
    headers: {
        Accept: "Accept: application/vnd.github.v3+json"
    }
})

interface IGit {
    userImg: string;
    description: string;
    lang: string;
    stars: number,
    tags: Array<string>,
}

const getInfo = async (): Promise<any> => {
    const result = await axios.get('/chandan-02/note-san');
    const git: IGit = {
        userImg: result.data.owner.avatar_url,
        description: result.data.description,
        lang: result.data.language,
        stars: result.data.stargazers_count,
        tags: result.data.topics
    }
    return git;
}

export default await getInfo();