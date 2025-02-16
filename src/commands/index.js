const { Command } = require("commander");
const checkBalance = require("./src/commands/balance");
const transferSOL = require("./src/commands/transfer");
const showHelp = require("./src/commands/help");

const program = new Command();

program
    .command("balance <publicKey>")
    .description("Check wallet balance")
    .action((publicKey) => {
        checkBalance(publicKey);
    });

program
    .command("transfer <recipientPublicKey> <amount>")
    .requiredOption("--from <senderKeypairPath>", "Path to sender's keypair JSON file")
    .description("Transfer SOL to another wallet")
    .action((recipientPublicKey, amount, options) => {
        transferSOL(options.from, recipientPublicKey, parseFloat(amount));
    });

program
    .command("help")
    .description("Show available commands")
    .action(() => {
        showHelp();
    });

program.parse(process.argv);