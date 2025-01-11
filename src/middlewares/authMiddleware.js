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

// Role-based auth middleware
export const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      // Ensure the public key is loaded
      const publicKey = await loadPublicKey();
      // Step 1: Get the JWS from Cookies
      console.log('req:'  , req);
      const jws = req.cookies?.authToken; 
      console.log('Cookies:', req.cookies);
      console.log('JWS:', jws);
      if (!jws) {
        return res.status(401).json({ error: 'Authorization token is missing or invalid.' });
      } 

      // Step 2: Verify the JWS using the public key
      const { payload } = await jwtVerify(jws, publicKey);

      console.log('Verified JWS Payload:', payload);

      // Step 3: Validate claims
      if (!payload.userId || !payload.userType) {
        return res.status(403).json({ error: 'Invalid sender identity.' });
      }

      // Check for token expiration
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTime) {
        return res.status(401).json({ error: 'Token has expired.' });
      }


      if (payload.userType != 'Admin' && allowedRoles.length > 0 && !allowedRoles.includes(payload.userType)) {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      }

      // Attach user info to the request object for downstream use
      req.user = {
        userId: payload.userId,
        role: payload.userRole,
      };

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error verifying JWS:', error.message);
      return res.status(401).json({ error: 'Invalid or tampered token.' });
    }
  };
};
