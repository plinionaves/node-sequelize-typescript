import { ModelCtor } from 'sequelize/types';
import Post from '../models/post.model'
import User from '../models/user.model'

export interface ModelsInterface {
  Post: ModelCtor<User>
  User: ModelCtor<Post>
}