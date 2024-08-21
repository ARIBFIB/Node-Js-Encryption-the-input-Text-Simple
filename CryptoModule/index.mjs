//backend 
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import crypto from 'crypto'

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const algorithm = 'aes-128-cbc';
const password = '1234' //chnage this password if needed 

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync(password, 'salt', 16); //32 bytes
    
    const cipher = crypto.createCipheriv(algorithm,key,iv);

    let encrypted = cipher.update(text, 'utf8','hex')

    encrypted += cipher.update(text, 'utf8','hex')
    return {
        iv: iv.toString('hex'), encryptedData: encrypted
    };
}

    const decrypt = (iv, encryptedData) => {
        const key = crypto.scryptSync(password, 'salt', 16);

        const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));

        let decrypted = decipher.update(encryptedData, 'hex' , 'utf8');

        decrypted += decipher.final('utf8');
        return decrypted;
    }

    app.post('/encrypt', (req, res) => {
        const {text} = req.body;
        const result = encrypt(text);
        res.json(result);
    });

    app.post('/decrypt', (req, res) => {
        const {iv, encryptedData} = req.body;
        const result = decrypt(iv, encryptedData);
        res.json({decryptedData: result});
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })


