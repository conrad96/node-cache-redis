import express from 'express';

const app = express();

app.use( express.json());


app.get('/', (req, res) => {
    //
});

const PORT = 3006;
app.listen(PORT, ()=> {
    console.log(`Listening on ${PORT}`);
});
