import axios from "axios";
import { JSDOM } from 'jsdom';
import db from "../common/db";
import { categoryNames, extractId, logger } from "./common";

export async function getMainPage(category: number) {
    const { data } = await axios.get(`https://scratch.mit.edu/discuss/${category}/`);
    const jsdom = new JSDOM(data);
    const document = jsdom.window.document;
    const table = document.querySelector("table");
    if (!table) {
        logger.warning("No table found on page");
        return;
    }

    const rows = table.querySelectorAll("tbody tr");
    logger.info(`Found ${rows.length} rows.`);

    for (const row of rows) {
        const tclCell = row.querySelector("td.tcl");
        if (!tclCell) {
            logger.warning("Skipping row without tcl cell");
            continue;
        }

        const titleLink = tclCell.querySelector("h3 a");
        if (!titleLink) {
            logger.warning("Skipping row without title link");
            continue;
        }

        const byUserElement = tclCell.querySelector(".tclcon .byuser");

        const title = titleLink.textContent?.trim() || '';
        const link = titleLink.getAttribute("href") || '';
        const author = byUserElement?.textContent?.slice(3).trim() || '';
        const scratchId = extractId(link);

        const doesItExist = await db.forumTopic.findUnique({ where: { scratchId } });

        if (doesItExist) {
            logger.info(`Topic ${scratchId} already in database, skipping.`);
            continue;
        }

        await db.forumTopic.create({
            data: {
                categoryNumber: category,
                categoryWord: categoryNames[category],
                hyperlink: link,
                op: author,
                title,
                scratchId,
            }
        });

        logger.info(`Added ${scratchId} to database.`);
    }
}
