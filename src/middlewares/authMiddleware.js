import { jwtVerify, importPKCS8 } from 'jose';
import fs from 'fs';

// Load the RSA private key for decrypting JWS
const privateKeyPath = process.env.JWS_PRIVATE_KEY_PATH; // Set this in your environment variables
const privateKeyPem = fs.readFileSync(privateKeyPath, 'utf8');

// Import the private key asynchronously
const privateKey = await importPKCS8(privateKeyPem, 'RS256');

/**
 * Middleware to decrypt and verify the JWS
 */
export async function verifySenderIdentity(req, res, next) {
  try {
    // Step 1: Get the JWS from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token is missing or invalid.' });
    }

    const jws = authHeader.split(' ')[1]; // Extract the token

    // Step 2: Verify the JWS using the private key
    const { payload, protectedHeader } = await jwtVerify(jws, privateKey);

    console.log('Verified JWS:', payload);
    console.log('Protected Header:', protectedHeader);

    // Step 3: Validate sender identity (e.g., check claims)
    if (!payload.userId || !payload.iss || payload.iss !== 'frontend-client') {
      return res.status(403).json({ error: 'Invalid sender identity.' });
    }

    // Check for token expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      return res.status(401).json({ error: 'Token has expired.' });
    }

    // Attach user info to the request object for downstream use
    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying JWS:', error.message);
    return res.status(401).json({ error: 'Invalid or tampered token.' });
  }
}
