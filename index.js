import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import 'dotenv/config';

import { MoviesURL, TheatreURL } from './server/constants/routes.constant.js';
import movieRoutes from './server/routes/movie.route.js';
import theatreRoutes from './server/routes/theatre.route.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(MoviesURL, movieRoutes);
app.use(TheatreURL, theatreRoutes);

/** MONGOOSE SETUP */
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL_LOCAL, {
    dbName: process.env.DB_NAME
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Starting Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} - Did not connect`));
