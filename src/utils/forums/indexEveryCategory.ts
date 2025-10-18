import sleep from "../common/sleep";
import Logger from "../logger/Logger";
import { categoryList, categoryNames } from "./common";
import { getMainPage } from "./indexTopics";

const logger = new Logger('Routine Indexing C');

export default async function indexEveryCategory() {
    for (const category of categoryList) {
        logger.info(`Indexing for ${categoryNames[category]} started.`);
        await getMainPage(category);
        logger.info('End of this category, sleeping for 60 seconds...');
        await sleep(1000 * 60); // wait 60 seconds before next category
    }
    logger.info('End of category list.');
}