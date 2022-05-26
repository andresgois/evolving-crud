const aws = require('aws-sdk');
const s3 = new aws.S3();
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');




module.exports = function (req, res, next) {
    console.log('LOGGED');
    if(process.env.STORAGE_TYPE === 's3'){
        return s3.deleteObject({
            Bucket: process.env.AWS_BUCKET,
            Key: this.key,
        }).promise();
    } else {
        return promisify(fs.unlink)(
            path.resolve(__dirname, '..','..','public', this.key)
        )
    }
    next();
  };