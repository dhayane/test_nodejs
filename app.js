import express from 'express';
import cors from 'cors';
import pollRoutes from './src/routes/pollRoutes.js'
import optionRoutes from './src/routes/optionRoutes.js';
import voteRoutes from './src/routes/voteRoutes.js';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/polls', pollRoutes);
    this.app.use('/options', optionRoutes);
    this.app.use('/votes', voteRoutes);
  }
}

export default new App().app;
