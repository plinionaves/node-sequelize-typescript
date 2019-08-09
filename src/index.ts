import db from './models'

db.sequelize.sync()
  .then(() => console.log('Sequelize synced!'))
  .catch(err => console.log('Error starting sequelize: ', err))