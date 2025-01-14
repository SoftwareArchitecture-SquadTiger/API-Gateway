import { compactDecrypt } from 'jose/jwe/compact/decrypt';
import { importPKCS8 } from 'jose/key/import';
import fs from 'fs';
// Import the private key
const loadPrivateKey = async () => {
  try {
    return await importPKCS8(privateKeyPem, 'RSA-OAEP');
  } catch (error) {
    console.error('Failed to load private key:', error.message);
    throw new Error('Private key loading failed');
  }
};

// Load the RSA private key for decrypting JWE
const privateKeyPath = process.env.JWE_PRIVATE_KEY_PATH || './secret/jwe_private.pem';
const privateKeyPem = fs.readFileSync(privateKeyPath, 'utf8');
const privateKey = await loadPrivateKey();
const jwe = "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ.FUyrFjGQSSey8BXy6qk0XdUP2Vu7jJ7Kdt-05gidcA6QiM9xjSoienA3eOVXXaXHOG6lwpu-tu7_xHiOcCUcLMqnjyJ31yZNh3FEWrHuDGV_aVy-MClgfzLK73G9PX336vn88NdTfAwN7bgtn2GId61obA79uk_wBpoAjg6GjdzT-Ll_rXR-5ITGg3pwB6HcZVuYxpxMpobZZFVuuv1Vw77lsQ525vXnjLe1DcNg9RVdg1xEICFIFOY324Noo8b-PRIfrTN3SwgzF632wZ_Cp_R8zDWPx3PHJtX47pB3XYxPSct4LXkoYGxy04M5iBM7Fvpy5eNLrHy6Hb6amVDlKQ.2ycdD8J7pwzsgDri.K66Cy2zXLJZPB17pZ0A7mMO0wGs2y2akw95r70KfOWNqKpR6oLRBysXZuV5sesldvFhY0Ux0Ny-0Oh5zPpH5R87Q3jDEfoQSkp4YphiGsWi1EWUpw4uH5up9OMMnRyH_clv9d4FG.6RRxxBAGQ78cr-HPQ20e9Q";
      // Step 2: Decrypt the JWE using the private key
      const { plaintext } = await compactDecrypt(jwe, privateKey);
      const payload = JSON.parse(new TextDecoder().decode(plaintext));
      console.log('Decrypted JWE Payload:', payload);
