import { Client, CommandInteraction } from "discord.js";
import { register, execute } from "./commandregister";
require('dotenv').config();

const client = new Client({
    intents: [
        "GuildMessages",
        "GuildMessageTyping",
        "GuildEmojisAndStickers",
        "GuildMessageReactions"
    ]
});

client.on("ready", (client) => {
    register(client);
});

client.on("interactionCreate", async (cmd) => {
    const interaction: CommandInteraction = cmd as CommandInteraction;
    execute(interaction);
});

client.login(process.env.TOKEN);