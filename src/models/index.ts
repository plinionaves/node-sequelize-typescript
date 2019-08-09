import * as fs from 'fs'
import * as path from 'path'
import { Sequelize, DataTypes, Options } from 'sequelize'
const {
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST
} = process.env

const basename: string = path.basename(module.filename)
let db = null

if (!db) {

  db = {}

  const config: Options = {
    dialect: 'mysql',
    host: MYSQL_HOST
  }

  const sequelize = new Sequelize(
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    config
  )

  fs
    .readdirSync(__dirname)
    .filter((file: string) => {
      const fileSlice: string = file.slice(-3)
      return (file.indexOf('.') !== 0) && (file !== basename) && ((fileSlice === '.js') || (fileSlice === '.ts'))
    })
    .forEach((file: string) => {
      const model = require(path.join(__dirname, file))
        .default
        .init(sequelize, DataTypes)
      db[model['name']] = model
    })

  Object.keys(db).forEach((modelName: string) => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  db['sequelize'] = sequelize

}

export default db