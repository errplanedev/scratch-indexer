import { JSDOM } from 'jsdom';
import axios from 'axios';
import { logger } from './common';

export default async function fetchPage(url: string) {
    const response = await axios.get(url);
    if(!(response.status == 200 || response.headers['Content-Type'] == 'text/html')) {
        logger.error(`Error while fetching ${url}, skipped`);
        return;
    }

    const jsdom = new JSDOM(response.data);
    return jsdom;
}