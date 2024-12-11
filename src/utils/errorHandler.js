export const handleAxiosErrorResponse = (error, res) => {
    console.error(`${error}`);

    const status = error.response?.status || 500;
    const responseMessage =
      error.response?.data?.message || error.message || "Internal Server Error";
  
    if (!res.headersSent) {
      res.status(status).json({ error: responseMessage });
    }
};