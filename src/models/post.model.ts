import { Model } from 'sequelize'

import { ModelsInterface } from '../interfaces'
import User from './user.model'

class Post extends Model {

  public id: string
  public title: string
  public content: string
  public photo: string
  public author: User

  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      photo: {
        type: DataTypes.BLOB({
          length: 'long'
        }),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'posts'
    })
  }

  static associate(models: ModelsInterface) {
    this.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'author',
        name: 'author'
      }
    })
  }

}

export default Post