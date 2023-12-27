const createServer = require("./createServer");

async function main() {
    try {
        const server = await createServer();
        await server.start();
    } catch (error) {
        console.error(error);
    }
}
main();