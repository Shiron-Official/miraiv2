module.exports.config = {
    name: "video",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát video thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Phương tiện",
    usages: "[searchVideos]",
    cooldowns: 10,
    envConfig: {
        "ManhG_KEY": "ĐIỀN KEY VÀO ĐÂY?(REG KEY TẠI WEB mzkapi.me)"
    }
};
var random = '12345ABCDE',
    number = 10,
    rdus = "videoManhG_";
for (var i = 0; i < number; i++) {
    rdus += random.charAt(Math.floor(Math.random() * random.length));
}
module.exports.run = async function({ event, api, args, body }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    var ManhG_KEY = global.configModule[this.config.name].ManhG_KEY;
    try {
        const { createReadStream, createWriteStream, unlinkSync, statSync } = require("fs-extra");
        let key_api = (await axios.get(`http://mzkapi.me/adminkey?key=${ManhG_KEY}`)).data;
        if (key_api.status != true) return api.sendMessage(`${key_api.msg}`, event.threadID, event.messageID);
        if (args.length == 0 || !args) return api.sendMessage('» Search cannot be left blank!', event.threadID, event.messageID);
        const keywordSearch = encodeURIComponent(args.join(" "));
        if (args.join(" ").indexOf("https://") == 0) {
            const linkurl = args.join(" ").trim();
            try {
                let res = await axios.get(`http://mzkapi.me/video?link=${linkurl}&apikey=${ManhG_KEY}`);
                api.sendMessage(`Video procesvideo, please wait...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 30000));
                let data = res.data;
                if (data.status != "ok") return api.sendMessage(`Can't download this video!`, event.threadID, event.messageID);
                let desc = data.title;
                let link = data.link.medium[0];
                var path1 = __dirname + `/cache/${rdus}.mp4`;
                const getms = (await axios.get(link, { responseType: "arraybuffer" })).data;
                fs.writeFileSync(path1, Buffer.from(getms, "utf-8"));
                if (fs.statSync(__dirname + `/cache/${rdus}.mp4`).size > 104000000) return api.sendMessage('File cannot be sent because it is larger than 100MB.', event.threadID, () => unlinkSync(__dirname + `/cache/${rdus}.mp4`), event.messageID);
                else return api.sendMessage({ body: desc, attachment: fs.createReadStream(__dirname + `/cache/${rdus}.mp4`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${rdus}.mp4`), event.messageID)
            } catch (e) {
                console.log(e);
                return api.sendMessage('Your request could not be processed!', event.threadID, event.messageID);
            }
        } else {
            try {
                var results = [],
                    link = [],
                    msg = "",
                    num = 0,
                    numb = 0,
                    imgthumnail = [],
                    value;
                results = (await axios.get(`http://mzkapi.me/youtube?q=${keywordSearch}&apikey=${ManhG_KEY}`)).data.results;

                for (let key in results) {
                    if (results[key].video != undefined) {
                        value = (results[key].video);
                        if (value.duration.length < 5) {
                            let folderthumnail = __dirname + `/cache/${numb += 1}.png`;
                            let linkthumnail = `${value.thumbnail_src}`;
                            let getthumnail = (await axios.get(`${linkthumnail}`, {
                                responseType: 'arraybuffer'
                            })).data;
                            fs.writeFileSync(folderthumnail, Buffer.from(getthumnail, 'utf-8'));
                            imgthumnail.push(fs.createReadStream(__dirname + `/cache/${numb}.png`));

                            num = num += 1;
                            link.push(value.id);
                            let time = value.duration;
                            msg += `${num}.《${time}》 ${value.title}\n\n`;
                        }
                    }
                }
                var body = `»🔎 There are ${link.length} results matching your search keyword:\n\n${msg}» Please reply (feedback) choose one of the above searches.`;
                api.sendMessage({
                        attachment: imgthumnail,
                        body: body
                    }, event.threadID, (error, info) => {
                        client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            idYT: link
                        })
                    },
                    event.messageID);
                return;
            } catch (error) {
                return api.sendMessage("The request could not be processed due to an error: " + error.message, event.threadID, event.messageID);
            }
        }
    } catch (ex) {
        console.log(ex);
        return;
    }
}

module.exports.handleReply = async function({ event, api, handleReply }) {
    const axios = require('axios')
    const fs = require("fs-extra");
    const request = require("request");
    var ManhG_KEY = global.configModule[this.config.name].ManhG_KEY;
    const { createReadStream, createWriteStream, unlinkSync, statSync } = require("fs-extra");
    var rqx = event.body;

    function number(x) {
        if (isNaN(x)) {
            return 'Not a Number!';
        }
        return (x < 1 || x > 20);
    }
    if (number(rqx)) return api.sendMessage('Choose from 1 -> 20, baby. love uwu ❤️', event.threadID, event.messageID);
    api.unsendMessage(handleReply.messageID);
    //for (let num = 1; num < 10; num++) { unlinkSync(__dirname + `/cache/${num}.png`) }
    api.sendMessage(`Video procesvideo, please wait...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 30000));
    try {
        let res = await axios.get(`http://mzkapi.me/video?link=http://youtu.be/${handleReply.idYT[event.body - 1]}&apikey=${ManhG_KEY}`);
        let data = res.data;
        if (data.status != "ok") return api.sendMessage(`Can't download this video!`, event.threadID, event.messageID);
        let desc = data.title;
        let link = data.link.medium[0];
        var path1 = __dirname + `/cache/${rdus}.mp4`;
        const getms = (await axios.get(link, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(path1, Buffer.from(getms, "utf-8"));
        if (fs.statSync(__dirname + `/cache/${rdus}.mp4`).size > 104000000) return api.sendMessage('File cannot be sent because it is larger than 50MB.', event.threadID, () => unlinkSync(__dirname + `/cache/${rdus}.mp4`), event.messageID);
        else return api.sendMessage({ body: desc, attachment: fs.createReadStream(__dirname + `/cache/${rdus}.mp4`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${rdus}.mp4`), event.messageID)
    } catch (e) {
        console.log(e);
        return api.sendMessage('Your request could not be processed!', event.threadID, event.messageID);
    }
}
