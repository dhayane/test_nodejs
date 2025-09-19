import Vote from '../models/Vote.js';
import Option from '../models/Option.js';
import Poll from '../models/Poll.js';

class VoteController {
  async index(req, res) {
    try {
      const votes = await Vote.findAll();
      res.json(votes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar votos' });
    }

  }
  async create(req, res) {
    try {
      const { optionId } = req.body;

      const option = await Option.findByPk(optionId, { include: Poll });
      if (!option) return res.status(404).json({ error: 'Opção não encontrada!' });

      const now = new Date();
      if(now < new Date(option.Poll.startDate) || now > new Date(option.Poll.endDate)) {
        return res.status(400).json({ error: 'Votação encerrada!' });
      }

      const vote = await Vote.create({ optionId });
      res.status(201).json(vote);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar voto' });
    }
  }

  async countByOption(req, res) {
    try {
      const { optionId } = req.params;
      const count = await Vote.count({ where: { optionId }});
      res.json({ optionId, totalVotes: count });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao contar votos' });
    }
  }
}

export default new VoteController();
