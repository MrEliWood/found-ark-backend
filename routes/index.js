const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
	res.send('<h1 style="text-align: center">Welcome to the Found Ark API</h1>');
});

module.exports = router;
