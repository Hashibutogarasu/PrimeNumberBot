import { randomInt } from "crypto";
import { Client } from "discord.js";
import cron from "node-cron";
import { isPrime } from "../utils/utils";

export async function cronSetstate(client: Client): Promise<void> {
    cron.schedule("*/5 * * * * *", async () => {
        const random = randomInt(0, 2048);

        client.user?.setPresence({
            status: "online",
            activities: [
                {
                    name: `落ち着け...素数を考えるんだ...${isPrime(random) ? `${random}...` : ``}`,
                }
            ],
        });
    });
}