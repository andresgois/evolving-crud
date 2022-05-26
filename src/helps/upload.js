require('dotenv').config();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..","..","public"))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key)
            });
        },
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.AWS_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const filename = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, filename)
            });
        },
    })
}

module.exports = {
    dest: path.resolve(__dirname, "..","..","public"),
    storage: storageTypes["local"],
    limits: {
        filesize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/jpg",
            "image/png"
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."))
        }
    }
}

/*
module.exports = {
    dest: path.resolve(__dirname, "..","..","public"),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..","..","public"))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const filename = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, filename)
            });
        },
    }),
    limits: {
        filesize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/jpg",
            "image/png"
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."))
        }
    }
}*/