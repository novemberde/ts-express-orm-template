import app from "./express-app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
}).on('error', (err) => {
    console.error(err);
});