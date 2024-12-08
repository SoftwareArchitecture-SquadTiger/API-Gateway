const loggerMiddleware = (req, res, next) => {
    const method = req.method; // HTTP Method (GET, POST, etc.)
    const url = req.originalUrl; // Requested URL
    const ip = req.ip; // IP Address of the client making the request

    //Indochina time
    const timestamp = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Bangkok',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date());

    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start; // Calculate response time
        const status = res.statusCode; 
        
        console.log(`[${timestamp}] IP:${ip} | Method:${method} | Route:${url} | Status:${status} | Time:${duration}ms`); 
    });

    next(); // Proceed to the next middleware/route handler
};

export default loggerMiddleware;
