var Client = /** @class */ (function () {
    function Client() {
        this.socket = io();
        this.socket.on("message", function (message) {
            console.log(message);
            document.body.innerHTML += message + " <br/>";
        });
        // this.socket.on("random", function (message: any) {
        //     console.log(message)
        //     document.body.innerHTML += "Winning number is " + message + "<br/>"
        // })
    }
    return Client;
}());
var client = new Client();
