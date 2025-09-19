import Option from '../models/Option.js';
import Poll from '../models/Poll.js';
import Vote from '../models/Vote.js'

import { fn, col } from 'sequelize';

class OptionController {
  async index(req, res) {
    try{
      const { pollId } = req.query;
      let options;

      const queryOptions = {
        include: [
          {
          model: Vote,
          attributes: []
          }
        ],
        attributes: {
          include: [
            [fn('COUNT', col('Votes.id')), 'voteCount']
          ]
        },
        group: ['Option.id']
      };

      if (pollId) {
        queryOptions.where = { pollId };
      }

      options = await Option.findAll(queryOptions);

      res.json(options);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar opções' });
    }
  }

  async create(req, res) {
    try {
      const { title, pollId } = req.body;

      const poll = await Poll.findByPk(pollId);
      if (!poll) {
        return res.status(404).json({ error: 'Não é possível criar opção: enquete não encontrada' });
      }

      if (!title) {
        return res.status(400).json({ error: 'O título da opção é obrigatório' });
      }

      const option = await Option.create({ title, pollId });
      res.status(201).json(option);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar opção' });
    }
  }

  async show(req, res) {
    try {
      const option = await Option.findByPk(req.params.id, {
        include: [ Vote ]
    });
      if (!option) return res.status(404).json({ error: 'Opção não encontrada! '})

      res.json(option);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar opção' });
    }
  }

  async update(req, res) {
    try {
      const option = await Option.findByPk(req.params.id);
      if(!option) return res.status(404).json({ error: 'Opção não encontrada' });

      const { title } = req.body;
      await option.update({ title });

      res.json(option);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar opção' });
    }
  }

  async delete(req, res) {
    try{
      const option = await Option.findByPk(req.params.id);
      if(!option) return res.status(404).json({ error: 'Opção não encontrada' })

        await option.destroy();
        res.json({ message: 'Opção deletada com sucesso' })
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar opção' })
    }
  }
}

export default new OptionController();
