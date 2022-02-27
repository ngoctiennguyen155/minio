const express = require("express");

const minio = require("minio");

var minioClient = new minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: process.env.USER,
  secretKey: process.env.PASS,
});
minioClient.makeBucket("photos", "us-east-1", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Bucket created successfully in "us-east-1".');
  }
  var file = require("fs").readFileSync(
    require("path")(__dirname, "/images/test.png")
  );
  var metaData = {
    "Content-Type": "application/octet-stream",
  };
  // Using fPutObject API upload your file to the bucket photos.
  minioClient.fPutObject(
    "photos",
    "icon.png",
    file,
    metaData,
    function (err, etag) {
      if (err) return console.log(err);
      console.log("File uploaded successfully.");
    }
  );
});
const app = express();

app.use(express.json());

app.listen(process.env.PORT || 8080, () => {
  console.log(`App is starting on port ${process.env.PORT || 8080}`);
});
