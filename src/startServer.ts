import { testServer } from './testServer';

testServer().listen(4000, () => console.log(`server is created pid ${process.pid}`));
