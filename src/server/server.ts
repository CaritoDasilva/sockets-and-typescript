import express from 'express';
import path from 'path';
import http from 'http';
import socketIO from 'socket.io';
import LuckyNumbersGame from './luckyNumbersGame';
const port: number = 8000;

export class Server{
    private server: http.Server;
    private port: number;
    private io: socketIO.Server;
    private game: LuckyNumbersGame;
    constructor(port: number) {
        this.port = port;
        const app = express();
        app.use(express.static(path.join(__dirname, '../client')))
        this.server = new http.Server(app);
        this.io = socketIO(this.server);
        this.game = new LuckyNumbersGame()
        this.io.on('connection', (socket) => {
            console.log('a user connected' + socket.id);
            // socket.emit('message', {name: 'Carito', age: 36})
            this.game.luckyNumbers[socket.id] = Math.floor(Math.random() * 10)
            // socket.emit('message', 'Hola a todos')
            socket.emit("message", "Hello " + socket.id + ", your lucky number is " + this.game.luckyNumbers[socket.id]);

            socket.broadcast.emit('message', `Todos dicen hola a ${socket.id}`)
            socket.on('disconnect', function () {
                console.log('socket disconnected : ' + socket.id);
            }); 
            
        });
        // setInterval(() => { this.io.emit("random", Math.floor(Math.random() * 10)) }, 1000)
        setInterval(() => {
            let randomNumber: number = Math.floor(Math.random() * 10)
            let winners: string[] = this.game.getWinners(randomNumber);
            if (winners.length) {
                winners.forEach(w => {
                    this.io.to(w).emit("message", "***Eres el ganador***" + randomNumber)
                })
            }
            this.io.emit("random", randomNumber)
        }, 1000)
    }

    public start(){
        this.server.listen(this.port);
        console.log(`Server listening on port ${this.port}`);
    }
}

new Server(port).start()