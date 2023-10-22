import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';

const check = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('このbotは何だ？'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("素数判定bot")
                    .setDescription("素数判定するだけやで")
                    .setAuthor({
                        name: "Hashibutogarasu",
                        iconURL: "https://avatars.githubusercontent.com/u/71928247?s=400&u=0aa4f0fcb50b83f9f09efacb87e0d661b5d55090&v=4",
                        url: "https://github.com/Hashibutogarasu/PrimeNumberBot"
                    })
                    .setFooter({
                        text: "使い方:/check number:5"
                    })
                    .setColor("Random")
                    .setTimestamp(),
            ]
        });
    },
};

module.exports = check;