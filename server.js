const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 65080 || 8080;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const socketServer = require('http').Server(app);
const webServer = require('http').createServer(app);

const io = require('socket.io')(socketServer, {
	cors: {
		origins: ['http://localhost:8080', 'https://found-ark-backend.uw.r.appspot.com', 'http://found-ark-backend.uw.r.appspot.com']
	}
});

io.on('connection', (socket) => {
	console.log('Connected to socket.io');
	socket.on('setup', (id) => {
		socket.join(id);
		console.log('==============================');
		console.log(id);
		socket.emit('connected');
	});

	socket.on('new notification', (newNoti) => {
		//if (!newNoti.reciever) return console.log("no reciever");
		socket.to(newNoti.receiver_id).emit('message recieved', newNoti);
		// socket.in(newNoti.receiver).emit("message recieved", newNoti);
		// socket.broadcast.emit('message recieved', newNoti.receiver+" " +newNoti.message)
	});

	socket.off('setup', () => {
		console.log('USER DISCONNECTED');
		socket.leave(id);
	});
});

// app.get('/', (req, res) => {
// 	res.status(200).send('Hello, world!').end();
// });

socketServer.listen(65080);

sequelize.sync({ force: false }).then(() => {
	webServer.listen(PORT, () => console.log('Now listening to port' + PORT));
});
