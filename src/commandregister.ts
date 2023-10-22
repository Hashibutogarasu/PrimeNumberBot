import { Client, CommandInteraction, REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
require('dotenv').config();

function getFolders() {
    const commands: Array<any> = [];

    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    return {
        commands: commands,
        foldersPath: foldersPath,
        commandFolders: commandFolders,
    }
}

export async function getCommands(): Promise<Array<any>> {
    const data = getFolders();

    for (const folder of data.commandFolders) {
        const commandsPath = path.join(data.foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                data.commands.push(command.data.toJSON());
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    return data.commands;
}

export async function execute(interaction: CommandInteraction): Promise<Array<any>> {
    const data = getFolders();

    for (const folder of data.commandFolders) {
        const commandsPath = path.join(data.foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if (interaction.commandName == command.data.name) {
                command.execute(interaction);
            }
        }
    }

    return data.commands;
}

export async function register(client: Client<true>) {
    const commands = await getCommands();

    const rest = new REST().setToken(process.env.TOKEN as string);

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationCommands(client.application.id),
            { body: commands },
        );
        console.log(`Successfully reloaded ${(data as any[]).length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
}