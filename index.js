import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import 'dotenv/config';

import { movies } from './server/constants/routes.constant.js';
import movieRoutes from './server/routes/movie.route.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(movies, movieRoutes);

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
