import { jwtVerify, importSPKI } from 'jose';
import fs from 'fs';

// Load the RSA public key for verifying JWS
const publicKeyPath = process.env.JWS_PUBLIC_KEY_PATH || './default-public-key.pem';
const publicKeyPem = fs.readFileSync(publicKeyPath, 'utf8');

// Import the public key
const loadPublicKey = async () => {
  try {
    return await importSPKI(publicKeyPem, 'RS256');
  } catch (error) {
    console.error('Failed to load public key:', error.message);
    throw new Error('Public key loading failed');
  }
};

// Define authMiddleware as a const function
export const authMiddleware = async (req, res, next) => {
  try {
    // Ensure the public key is loaded
    const publicKey = await loadPublicKey();

    // Step 1: Get the JWS from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token is missing or invalid.' });
    }

    const jws = authHeader.split(' ')[1]; // Extract the token

    // Step 2: Verify the JWS using the public key
    const { payload } = await jwtVerify(jws, publicKey);

    console.log('Verified JWS Payload:', payload);

    // Step 3: Validate claims
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
};
