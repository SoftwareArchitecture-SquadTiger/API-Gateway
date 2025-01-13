import { compactDecrypt, importPKCS8 } from 'jose';
import fs from 'fs';
import express from 'express';
// Load the RSA private key for decrypting JWE
const privateKeyPath = process.env.JWE_PRIVATE_KEY_PATH || './jwe_private.pem';
const privateKeyPem = fs.readFileSync(privateKeyPath, 'utf8');

// Import the private key
const loadPrivateKey = async () => {
  try {
    return await importPKCS8(privateKeyPem, 'RSA-OAEP');
  } catch (error) {
    console.error('Failed to load private key:', error.message);
    throw new Error('Private key loading failed');
  }
};

// Role-based auth middleware
export const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const privateKey = await loadPrivateKey();
      console.log(privateKey);
      console.log(req.cookies);  // Check if the cookie is present
      // Step 1: Get the JWE token from the cookie
      const jwe = req.cookies?.authToken; // Assuming the token is stored in the 'authToken' cookie
      console.log(jwe);
      if (!jwe) {
        console.log('Authorization token is missing or invalid.');
        return res.status(401).json({ error: 'Authorization token is missing or invalid.' });
      }
      // Step 2: Decrypt the JWE using the private key
      const { plaintext } = await compactDecrypt(jwe, privateKey);
      const payload = JSON.parse(new TextDecoder().decode(plaintext));
      console.log('Decrypted JWE Payload:', payload);
      // Step 3: Validate claims
      if (!payload.userId || !payload.userType) {
        console.log('Invalid payload:', payload);
        return res.status(403).json({ error: 'Invalid sender identity.' });
      }

      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTime) {
        console.log('Token has expired:', payload.exp, currentTime);
        return res.status(401).json({ error: 'Token has expired.' });
      }

      if (
        payload.userType !== 'Admin' &&
        allowedRoles.length > 0 &&
        !allowedRoles.includes(payload.userType)
      ) {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      }

      // Attach user info to the request object for downstream use
      req.user = {
        userId: payload.userId,
        role: payload.userType,
      };

      next();
    } catch (error) {
      console.error('Error decrypting JWE:', error.message);
      return res.status(401).json({ error: 'Invalid or tampered token.' });
    }
  };
};