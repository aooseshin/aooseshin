import { sequelize } from './models';
import { ENV } from './config';
import to from 'await-to-js';
import * as express  from 'express';
import { users } from './routes/user';

const app = express();

app.use('/users', users);

app.listen({ port: ENV.PORT }, async () => {
    console.log(`🚀 Server ready at http://localhost:${ENV.PORT}`);
    let err;
    [err] = await to(sequelize.sync(
        // {force: true},
    ));

    if(err){
        console.error('Error: Cannot connect to database');
    } else {
        console.log('Connected to database');
    }
});
