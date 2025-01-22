import AWS from "aws-sdk";

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

export const uploadToS3 = async (fileName: string, base64Data: string, fileType: string) => {
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET_NAME!,
    Key: `uploads/${fileName}`,
    Body: Buffer.from(base64Data.split(",")[1], "base64"),
    ContentType: fileType,
    ACL: "public-read",
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location; // Return the file URL
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Error uploading to S3");
  }
};
