import host from '../host/host.js';

const PORT = 4000;
const HOST = "something";

host.listen(PORT, '0.0.0.0',() => {
    console.log(`Team A Application running on http://${HOST}:${PORT}`);
});
