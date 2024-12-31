import server from "./app";
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

