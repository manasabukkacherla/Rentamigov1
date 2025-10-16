require('dotenv').config();
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

console.log('Testing AWS S3 credentials...');
console.log('Region:', process.env.AWS_REGION);
console.log('Access Key ID:', process.env.AWS_ACCESS_KEY_ID ? 'Set' : 'Not set');
console.log('Secret Key:', process.env.AWS_SECRET_ACCESS_KEY ? 'Set' : 'Not set');
console.log('Bucket:', process.env.AWS_S3_BUCKET_NAME);

s3.send(new ListBucketsCommand({}))
  .then(() => {
    console.log('✅ AWS credentials are valid');
  })
  .catch(err => {
    console.log('❌ AWS credentials error:', err.message);
    console.log('Full error:', err);
  });