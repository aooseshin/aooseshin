import { DefaultScope, Default, Table, Column, Model, BeforeSave, AllowNull, IsEmail, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import to from 'await-to-js';

@DefaultScope(() => ({
  attributes: ['id', 'username', 'name']
}))
@Table({timestamps: true})
export class User extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Default('')
  @AllowNull(false)
  @Column
  username: string;

  @Default('')
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @IsEmail
  @Column({unique: true})
  email!: string;

  @Default('')
  @AllowNull(false)
  @Column
  password!: string;

  token: string;
  login: boolean;
  @BeforeSave
  static async hashPassword(user: User) {
    let err;
    if (user.changed('password')){
        let salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10));
        if(err) {
          throw err;
        }

        [err, hash] = await to(bcrypt.hash(user.password, salt));
        if(err) {
          throw err;
        }
        user.password = hash;
    }
  }

  async comparePassword(pw) {
      let err, pass;
      if(!this.password) {
        throw new Error('密碼為必填欄位');
      }

      [err, pass] = await to(bcrypt.compare(pw, this.password));
      if(err) {
        throw err;
      }

      if(!pass) {
        throw '密碼輸入錯誤';
      }

      return this;
  }
}