const jose = require('jose')
const base64url = require('base64url');
const fs = require('fs');

const {
  JWE,   // JSON Web Encryption (JWE)
  JWK,   // JSON Web Key (JWK)
  JWKS,  // JSON Web Key Set (JWKS)
  JWS,   // JSON Web Signature (JWS)
  JWT,   // JSON Web Token (JWT)
  errors // errors utilized by jose
} = jose

let jwk = jose.JWK.generateSync(
    'RSA',
    2048, 
    {
        alg: 'RSA-OAEP-256',
        key_ops: ['encrypt', 'decrypt'],
        use: 'enc'
    }
);

let pub = jwk.toPEM();
let pvt = jwk.toPEM(true);

console.log(`public:\n${pub}`);
console.log(`private:\n${pvt}`);

fs.writeFileSync('./private.pem', pvt);
fs.writeFileSync('./public.pem', pub);


