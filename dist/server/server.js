"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const luckyNumbersGame_1 = __importDefault(require("./luckyNumbersGame"));
const port = 8000;
class Server {
    constructor(port) {
        this.port = port;
        const app = express_1.default();
        app.use(express_1.default.static(path_1.default.join(__dirname, '../client')));
        this.server = new http_1.default.Server(app);
        this.io = socket_io_1.default(this.server);
        this.game = new luckyNumbersGame_1.default();
        this.io.on('connection', (socket) => {
            console.log('a user connected' + socket.id);
            // socket.emit('message', {name: 'Carito', age: 36})
            this.game.luckyNumbers[socket.id] = Math.floor(Math.random() * 10);
            // socket.emit('message', 'Hola a todos')
            socket.emit("message", "Hello " + socket.id + ", your lucky number is " + this.game.luckyNumbers[socket.id]);
            socket.broadcast.emit('message', `Todos dicen hola a ${socket.id}`);
            socket.on('disconnect', function () {
                console.log('socket disconnected : ' + socket.id);
            });
        });
        // setInterval(() => { this.io.emit("random", Math.floor(Math.random() * 10)) }, 1000)
        setInterval(() => {
            let randomNumber = Math.floor(Math.random() * 10);
            let winners = this.game.getWinners(randomNumber);
            if (winners.length) {
                winners.forEach(w => {
                    this.io.to(w).emit("message", "***Eres el ganador***" + randomNumber);
                });
            }
            this.io.emit("random", randomNumber);
        }, 1000);
    }
    start() {
        this.server.listen(this.port);
        console.log(`Server listening on port ${this.port}`);
    }
}
exports.Server = Server;
new Server(port).start();
