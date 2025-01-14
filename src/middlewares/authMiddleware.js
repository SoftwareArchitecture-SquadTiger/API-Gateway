/**
 * Authorization Middleware for Role-Based Access Control
 *
 * Decrypts and validates a JSON Web Encryption (JWE) token from cookies to authorize requests.
 * Supports role-based access by verifying user roles against allowed roles specified in the middleware.
 */

import { compactDecrypt, importPKCS8 } from 'jose';
import fs from 'fs';

// Load the JWE private key for decrypting JWE
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

/**
 * Middleware for authorizing requests based on roles and JWE validation.
 * @param {string[]} allowedRoles - Array of roles allowed to access the route.
 * @returns {Function} Middleware function for Express.js.
 */
export const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const privateKey = await loadPrivateKey();
      console.log(privateKey);
      console.log(req.cookies);  
      const jwe = req.cookies?.authToken; 
      console.log(jwe);
      if (!jwe) {
        console.log('Authorization token is missing or invalid.');
        return res.status(401).json({ error: 'Authorization token is missing or invalid.' });
      }
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