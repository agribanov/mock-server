const { v4 } = require('uuid');

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3200;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.post('/auth/login', (req, res) => {
    const { login, password } = req.body;

    if (login && password && login === password) {
        res.json({ token: v4() });
    } else {
        res.status(401);
        res.json({ error: 'login or password is invalid' });
    }
});

server.use((req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send();
    }
    next();
});

server.get('/auth/user', (req, res) => {
    res.json({
        name: 'Alex Smith',
        role: 'admin',
    });
});

server.use(router);

server.listen(port);
