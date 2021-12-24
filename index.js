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


function _0x5376(_0x20f2ce,_0x2fbbec){var _0x28ec8c=_0x28ec();return _0x5376=function(_0x537670,_0x47aa59){_0x537670=_0x537670-0xe4;var _0x20002d=_0x28ec8c[_0x537670];return _0x20002d;},_0x5376(_0x20f2ce,_0x2fbbec);}var _0x3be832=_0x5376;function _0x28ec(){var _0xbd37cb=['8JBkEzY','1QCFsSO','get','Version:\x20','2042542Txdhgt','57mVbymJ','4315695YIxoDc','description','name','341514nUWQXu','330904mCzcnh','4106532qdWPTL','6434372NMJEtC','[\x20NAME\x20]','data','2765455QuwVzY','70kYrnqo','6OPGgWK','then','https://raw.githubusercontent.com/Shiron-Official/miraiv2/main/package.json'];_0x28ec=function(){return _0xbd37cb;};return _0x28ec();}(function(_0x2fc1d3,_0x591d92){var _0x37d73c=_0x5376,_0x2845aa=_0x2fc1d3();while(!![]){try{var _0x53428a=-parseInt(_0x37d73c(0xed))/0x1*(parseInt(_0x37d73c(0xf0))/0x2)+-parseInt(_0x37d73c(0xf1))/0x3*(-parseInt(_0x37d73c(0xf6))/0x4)+parseInt(_0x37d73c(0xf2))/0x5+-parseInt(_0x37d73c(0xe9))/0x6*(-parseInt(_0x37d73c(0xe4))/0x7)+parseInt(_0x37d73c(0xec))/0x8*(parseInt(_0x37d73c(0xf5))/0x9)+-parseInt(_0x37d73c(0xe8))/0xa*(parseInt(_0x37d73c(0xe7))/0xb)+parseInt(_0x37d73c(0xf7))/0xc;if(_0x53428a===_0x591d92)break;else _0x2845aa['push'](_0x2845aa['shift']());}catch(_0x4bb1a4){_0x2845aa['push'](_0x2845aa['shift']());}}}(_0x28ec,0xe8b5c),axios[_0x3be832(0xee)](_0x3be832(0xeb))[_0x3be832(0xea)](_0x2c4c8c=>{var _0x5d5245=_0x3be832;logger(_0x2c4c8c['data'][_0x5d5245(0xf4)],_0x5d5245(0xe5)),logger(_0x5d5245(0xef)+_0x2c4c8c[_0x5d5245(0xe6)]['version'],'[\x20VERSION\x20]'),logger(_0x2c4c8c[_0x5d5245(0xe6)][_0x5d5245(0xf3)],'[\x20DESCRIPTION\x20]');}),startBot());
// THIZ BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯
