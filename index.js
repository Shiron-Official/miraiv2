const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");

/////////////////////////////////////////////
//========= Check node.js version =========//
/////////////////////////////////////////////

// const nodeVersion = semver.parse(process.version);
// if (nodeVersion.major < 13) {
//     logger(`Your Node.js ${process.version} is not supported, it required Node.js 13 to run bot!`, "error");
//     return process.exit(0);
// };

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const dashboard = http.createServer(function (_req, res) {
    res.writeHead(200, "OK", { "Content-Type": "text/plain" });
    res.write("HI! THIS BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯");
    res.end();
});

dashboard.listen(process.env.port || 0);

logger("Opened server site...", "[ Starting ]");

/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

function startBot(message) {
    (message) ? logger(message, "[ Starting ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (codeExit) => {
        if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
            startBot("Restarting...");
            global.countRestart += 1;
            return;
        } else return;
    });

    child.on("error", function (error) {
        logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
    });
};
////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////


function _0xce87(){var _0x5cd924=['version','[\x20NAME\x20]','2jXiLcu','75304yWuMTf','577542Ycyxdl','6358NHhkXu','1488290glMzcF','558MzqYFn','238mXRUBv','Version:\x20','56170dLIJyD','[\x20VERSION\x20]','[\x20DESCRIPTION\x20]','323629bWFmaL','get','3408LIVcTH','4QFGauY','name','1141386DanUHZ','data','description'];_0xce87=function(){return _0x5cd924;};return _0xce87();}function _0xce02(_0x27b22d,_0x55609d){var _0xce8735=_0xce87();return _0xce02=function(_0xce02e4,_0x8da990){_0xce02e4=_0xce02e4-0xa7;var _0x347a75=_0xce8735[_0xce02e4];return _0x347a75;},_0xce02(_0x27b22d,_0x55609d);}var _0x217a30=_0xce02;(function(_0x4fe066,_0x27a276){var _0x494bbd=_0xce02,_0x4c1f46=_0x4fe066();while(!![]){try{var _0x2edebb=-parseInt(_0x494bbd(0xb2))/0x1*(parseInt(_0x494bbd(0xa7))/0x2)+-parseInt(_0x494bbd(0xa9))/0x3+parseInt(_0x494bbd(0xb5))/0x4*(-parseInt(_0x494bbd(0xab))/0x5)+parseInt(_0x494bbd(0xb7))/0x6+parseInt(_0x494bbd(0xad))/0x7*(parseInt(_0x494bbd(0xa8))/0x8)+parseInt(_0x494bbd(0xac))/0x9*(parseInt(_0x494bbd(0xaf))/0xa)+-parseInt(_0x494bbd(0xaa))/0xb*(-parseInt(_0x494bbd(0xb4))/0xc);if(_0x2edebb===_0x27a276)break;else _0x4c1f46['push'](_0x4c1f46['shift']());}catch(_0x2f5d0f){_0x4c1f46['push'](_0x4c1f46['shift']());}}}(_0xce87,0x32fee),axios[_0x217a30(0xb3)]('https://raw.githubusercontent.com/Shiron-Official/miraiv2/main/package.json')['then'](_0x5ee5e7=>{var _0x57da58=_0x217a30;logger(_0x5ee5e7['data'][_0x57da58(0xb6)],_0x57da58(0xbb)),logger(_0x57da58(0xae)+_0x5ee5e7[_0x57da58(0xb8)][_0x57da58(0xba)],_0x57da58(0xb0)),logger(_0x5ee5e7['data'][_0x57da58(0xb9)],_0x57da58(0xb1));}),startBot());
// THIZ BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯

