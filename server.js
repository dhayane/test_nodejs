import app from './app.js'
import sequelize from './src/database/index.js';
import './src/models/index.js';

const PORT = 3000;

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Tables sincronizadas');

    app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
} catch (error) {
  console.log('Erro ao sincronizar tabelas:', error)
}
})();
