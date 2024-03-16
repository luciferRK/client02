import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import styles from "./styles.module.css"; // Import CSS module

const Main = () => {
    const [username, setUsername] = useState(localStorage.getItem("username") || '');
    const [qrColor, setQRColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const downloadQRCode = () => {
        const canvas = document.getElementById("qr-code");
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr-code.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className={styles.fixedContainer}>
            <div className={styles.innerContainer}>
                <nav className={styles.navbar}>
                    <h4>QR Code Generator App</h4>
                    <button className={styles.white_btn} onClick={handleLogout}>
                        Logout
                    </button>
                </nav>
                <div className={styles.container} style={{ backgroundColor: '#dddddd', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                    <div className={styles["qr-code-container"]} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <QRCode 
                                id="qr-code" 
                                value={username} 
                                bgColor={bgColor}
                                fgColor={qrColor}
                                size={256}
                                level="H"
                                includeMargin={true}
                                className={styles["qr-code"]}
                            />
                        </div>
                    </div>
                    <div style={{ marginLeft: '50px' }}>
                        <input 
                            type="text" 
                            placeholder="Enter your username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '300px', marginBottom: '20px', fontSize: '18px', marginTop: '0px' }}
                        />
                        <div>
                            <label>QR Code Color: </label>
                            <input 
                                type="color" 
                                value={qrColor} 
                                onChange={(e) => setQRColor(e.target.value)}
                                style={{ width: '40px', marginBottom: '10px' }}
                            />
                        </div>
                        <div>
                            <label>Background Color: </label>
                            <input 
                                type="color" 
                                value={bgColor} 
                                onChange={(e) => setBgColor(e.target.value)}
                                style={{ width: '40px', marginBottom: '30px' }}
                            />
                        </div>
                        <button onClick={downloadQRCode}>Download QR Code</button>
                    </div>
                </div>
            </div>
            <div className={styles.footer} style={{ backgroundColor: '#000000', height: '150px', color: '#ffffff', textAlign: 'center', paddingTop: '20px' }}>
                <h1 style={{ marginTop: '3px'}}>QR Application</h1>
                <p>Copyright 2024 by Keerti B.</p>
            </div>
        </div>
    );
};

export default Main;
