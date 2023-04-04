import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const apiKey = process.env.API_KEY;

app.use( express.json());
app.use( express.urlencoded({extended: true}));

const fetchNewsHeadlines = async (keyword) =>{
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    const data = await axios.get(url)
    return data;
}

const fetchNewsBySearch = async (keyword)  => {
    const url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`;
    const results = await axios.get(url);
    return results;
}


app.get("/search/:q", async (req, res) => {
    const {q} = req.params;

    try {
        const {data} = await fetchNewsBySearch(q);
        if(data.length == 0) {
            throw "No search results were found!";
        }else {
            let {articles} = data;

            res.status(200).send({
                cached: false,
                data: articles
            });
        }
    } catch (error) {
        console.error();
        res.status(404).send({msg: 'No news were found!'});
    }
});

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Listening on ${PORT}`);
});
