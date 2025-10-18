import express from 'express';
import Logger from './utils/logger/Logger';
import { getMainPage } from './utils/forums/indexTopics';
import { categoryList, categoryNames } from './utils/forums/common';
import sleep from './utils/common/sleep';
import indexEveryCategory from './utils/forums/indexEveryCategory';

const logger = new Logger('Server');

const app = express();
const port = 3000;



app.listen(port, () => {
    logger.info(`Running on *:${port}`);
});

indexEveryCategory()

setInterval(() => {
    indexEveryCategory();
}, 3600000); // 1 hour (60 minutes)