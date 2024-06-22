const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const date_timeFolder = ".date_time";

if (!fs.existsSync(date_timeFolder)) {
    fs.mkdirSync(date_timeFolder)
};

//Route for creating File at particular Folder
app.post("/createFile", (req, res) => {
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = (currentTime.getMonth() + 1).toString();
    const date = currentTime.getDate().toString();
    const hours = currentTime.getHours().toString();
    const minutes = currentTime.getMinutes().toString();
    const seconds = currentTime.getSeconds().toString();

    const dateTimeForFileName = `${year}-${month}-${date}-${hours}-${minutes}-${seconds}.txt`;
    const filePath = path.join(date_timeFolder, dateTimeForFileName);

    fs.writeFile(filePath, currentTime.toISOString(), (err) => {
        if (err) {
            res.status(500).send(`Error creating file:$(err)`);
        }
        res.send(`File is created successfully at:${filePath}`);
    });
});

//Route for get All File in the Folder
app.get("/getFiles", (req, res) => {
    //Reading the Files
    fs.readdir(date_timeFolder, (err, files) => {
        if (err) {
            res.status(500).send(`Error while reading the file:$(err)`);
        }
        console.log("List of files:", files);
        const textFiles = files.filter((file) => path.extname(file) === ".txt");

        res.json(textFiles);
    });
});

app.listen(PORT, () => {
    console.log("Server is running on PORT NO", PORT);
});