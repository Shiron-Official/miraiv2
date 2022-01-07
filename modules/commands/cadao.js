module.exports.config = {
	name: "cadao",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "VanHung (TrungKien fix)",
	description: "Ca Dao Việt Nam",
	commandCategory: "News",
	usages: "cadao",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
const axios = require('axios');
const request = require('request');
const fs = require("fs");
const fetch = global.nodemodule["node-fetch"];
var fetchcd = await fetch("https://raw.githubusercontent.com/Shiron-Official/apikey-DATA/main/cadao.json")
var jsoncd =  await fetchcd.json()
	axios.get('https://apiimg.dat2004bg.repl.co/anh').then(res => {
    let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
			 api.sendMessage({
				body: `Ca dao Việt Nam:\n﹤ ${jsoncd.data[String(Math.floor(Math.random() * 268) + 1)]} ﹥`,
						attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
			})
}
