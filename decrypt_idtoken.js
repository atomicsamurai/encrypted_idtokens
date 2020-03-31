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

let args = process.argv.slice(2);
if(args.length != 1) {
  console.log(`usage: node decrypt_idtoken.js <encrypted id_token>`);
  process.exit();
}
let jwe = args[0];
// console.log(`encrypted: ${jwe.slice(0, 10)}...`);
const pub = jose.JWK.asKey(fs.readFileSync('public.pem'));
const pvt = jose.JWK.asKey(fs.readFileSync('private.pem'));
// console.log(pvt);

let result = jose.JWE.decrypt(jwe, pvt, {complete: false});
console.log(jose.JWT.decode(result.toString(), {complete: true}));
