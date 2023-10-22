import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';
import { isPrime } from '../../utils/utils';
const check = {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('素数か判別するゾ')
        .addIntegerOption((option) => option.setName("number").setDescription("enter a number").setRequired(true)),
    async execute(interaction: CommandInteraction) {
        const number = interaction.options.get("number")?.value as number;
        if (number) {
            const prime = isPrime(number);

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("素数判定結果")
                        .setDescription(prime ? `${number}は素数です` : `${number}は素数じゃないよ(笑)`)
                        .setColor(prime ? "Green" : "Red")
                        .setTimestamp(),
                ]
            });
        }
        else {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Error")
                        .setDescription("エラーあるよ(笑)")
                        .setColor("Red")
                        .setTimestamp(),
                ]
            });
        }
    },
};

module.exports = check;