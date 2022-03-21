// console.log("Hello World")
import express from 'express';
const app = express();

import indexRoutes from './routes/index'

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(indexRoutes);

app.listen(3000, () => {
    console.log('server port', 3000)
});


