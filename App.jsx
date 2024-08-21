// frontend/src/App.js
import React, { useState } from 'react';

const App = () => {
    const [text, setText] = useState('');
    const [encryptedData, setEncryptedData] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
    const [iv, setIv] = useState('');

    const handleEncrypt = async () => {
        const response = await fetch('http://localhost:3000/encrypt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
        const data = await response.json();
        setEncryptedData(data.encryptedData);
        setIv(data.iv);
    };

    const handleDecrypt = async () => {
        const response = await fetch('http://localhost:3000/decrypt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ iv, encryptedData }),
        });
        const data = await response.json();
        setDecryptedText(data.decryptedData);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Crypto Example</h1>
            <textarea 
                rows="4" 
                cols="50" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Enter text to encrypt"
            />
            <button onClick={handleEncrypt}>Encrypt</button>
            <h2>Encrypted Data:</h2>
            <p>{encryptedData}</p>
            <h2>IV:</h2>
            <p>{iv}</p>

            <h2>Decrypt</h2>
            <button onClick={handleDecrypt} disabled={!encryptedData}>Decrypt</button>
            <h2>Decrypted Text:</h2>
            <p>{decryptedText}</p>
        </div>
    );
};

export default App;