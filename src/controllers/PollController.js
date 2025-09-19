import Poll from '../models/Poll.js';
import Option from '../models/Option.js';
import Vote from '../models/Vote.js';

import { fn, col } from 'sequelize';

class PollController {
  async index(req, res) {
    try{
      const polls = await Poll.findAll({
      include: [
        {
          model: Option,
          attributes: {
            include: [
              [fn('COUNT', col('Options.Votes.id')), 'voteCount']
            ]
          },
          include: [
            {
              model: Vote,
              attributes: []
            }
          ]
        }
      ],
      group: ['Poll.id', 'Options.id']
    });

    res.json(polls);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar enquetes' });
    }
  }

  async create(req, res) {
    try {
      const { title, description, startDate, endDate } = req.body;
      const poll = await Poll.create({ title, description, startDate, endDate });
      res.status(201).json(poll);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar enquete' });
    }
  }

  async show(req, res) {
    try {
      const poll = await Poll.findByPk(req.params.id, {
        include: [Option]
      });
      if(!poll) return res.status(404).json({ error: 'Enquete não encontrada' });
      res.json(poll);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar enquete' });
    }
  }

  async update(req, res) {
    try {
      const poll = await Poll.findByPk(req.params.id);
      if(!poll) return res.status(404).json({ error: 'Enquete não encontrada' });

      const { title, description, startDate, endDate } = req.body;
      await poll.update({ title, description, startDate, endDate });

      res.json(poll);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar enquete' });
    }
  }

  async delete(req, res) {
    try {
      const poll = await Poll.findByPk(req.params.id);
      if(!poll) return res.status(404).json({ error: 'Enquete não encontrada' });

      await poll.destroy();
      res.json({ message: 'Enquete deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar enquete' });
    }
  }
}

export default new PollController();
