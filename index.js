import express from 'express';
import axios from 'axios';
import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const apiKey = process.env.API_KEY;

app.use( express.json());
app.use( express.urlencoded({extended: true}));

//config Redis
let redisClient;
(async ()=> {
    redisClient = redis.createClient();

    redisClient.on('error', ()=> console.error());

    redisClient.connect(); //will connect on default port
    console.log('Redis is running...');
})();

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

app.get('/', (req, res) => {
    res.status(200).send({msg: 'connected!'});
})

app.get("/search/:q", async (req, res) => {
    const {q} = req.params;
    let cached = false;

    try {
        let results;

        //check if key exists in redis-cache, if it does fetch from redis. else make api request.
        let cacheResults = await redisClient.get(q);
        console.log(cacheResults);
        if(cacheResults) {
            cached = true;
            results = JSON.parse(cacheResults);
        }else { //make api request

            const {data} = await fetchNewsBySearch(q);
            results = data?.articles;

            if(data.length == 0) throw "No search results were found!";

            //add to cache
            redisClient.set(q, JSON.stringify(results));
        }

        res.status(200).send({
            cached,
            data: results
        });
    } catch (error) {
        console.error();
        res.status(404).send({msg: 'No news results were found!'});
    }
});

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Listening on ${PORT}`);
});
