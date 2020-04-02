# DISCLAIMER
The sample code described herein is provided on an "as is" basis, without warranty of any kind, to the fullest extent permitted by law. ForgeRock does not warrant or guarantee the individual success developers may have in implementing the sample code on their development platforms or in production configurations.
ForgeRock does not warrant, guarantee or make any representations regarding the use, results of use, accuracy, timeliness or completeness of any data or information relating to the sample code. ForgeRock disclaims all warranties, expressed or implied, and in particular, disclaims all warranties of merchantability, and warranties related to the code, or any service or software related thereto.
ForgeRock shall not be liable for any direct, indirect or consequential damages or costs of any type arising out of any action taken by you or others related to the sample code.

# encrypted_idtokens
Set of simple node js scripts to test generation of encrypted id_tokens using ForgeRock AM and decrypting them

## genkeys.js
Creates a key pair for encrypting/decrypting the CEK (content encrption key), hard coded to use RSA-OAEP-256 as `alg`, but you can change it in the code. The keys are saved as `private.pem` and `public.pem` in the current directory.

## decrypt_idtoken.js
decrypts the encrypted id_token (JWE) using the private key generated above.

## How to use
1. First, you need nodejs (v12.9.0 or above) installed.
2. Run `npm install` to get all dependencies.
3. Run `node genkeys.js` to generate the keys and get them saved to the files `private.pem` and `public.pem`
4. Copy the contents of `public.pem` and paste it in the `Client ID Token Public Encryption Key` parameter of your OAuth2.0 client profile in ForgeRock AM.
5. For the current `alg` make sure (in AM OAuth2.0 client settings):
   1. `ID Token Signing Algorithm` is set to `RS256`
   2. `ID Token Encryption Algorithm` is set to `RSA-OAEP-256`
   3. `ID Token Encryption Method` is set to `A128GCM`
   4. `Public key selector` is set to `X509`
6. Request an id_token from AM.
7. Copy the encrypted id_token value and decrypt it by running `node decrypt_idtoken.js <paste encrypted value>`. It should output something like:

```
{
  header: { typ: 'JWT', kid: 'wU3ifIIaLOUAReRB/FG6eM1P1QM=', alg: 'RS256' },
  payload: {
    at_hash: 'KmfPFhXSWPbd4_UQahoPEA',
    sub: 'testuser1',
    address: {},
    auditTrackingId: '774678ef-d35e-47b2-b0c3-10dfd5404a8f-445935',
    iss: 'http://openam.example.com:8080/openam/oauth2/realms/root/realms/sdktest',
    tokenName: 'id_token',
    linked_accounts: 'W1t7ImFwcF9pZCI6IkNNUyIsInByaW1hcnlfa2V5IjoiMTAwMDAwNzIiLCJzZWNvbmRhcnlfa2V5IjoiMTAwMDE4OTMifV1d',
    aud: 'ForgeRockSDKClient',
    c_hash: 'bdFcJ-gtKDsJDPaVd_2utQ',
    acr: '0',
    'org.forgerock.openidconnect.ops': 'ujUyKimhfPy6LomwkMqNkwMjDv4',
    s_hash: 'pagIEVRn2-UhUmaFGSPfFw',
    azp: 'ForgeRockSDKClient',
    auth_time: 1585693943,
    name: 'testuser1',
    realm: '/sdktest',
    exp: 1585697544,
    tokenType: 'JWTToken',
    family_name: 'testuser1',
    iat: 1585693944,
    email: 'testuser1@example.com'
  },
  signature: 'ERXQIReZeFlRCdtQVzVstX3b1amNb8nB0dBs2dBTwVTdwotrYC7cq7_zfVCr25P2nrm6DqdFoOvTgkafFHPXmJ_GxQDDRlHZsTs8LsOqxqxYOb_109Kx5r3lYw3XrDDEfaPCjxOL0SPwgrGttDbHJW2BAJs9f6BCeGZDAZYcXsQTLbZ6CifUuXtBebMLNJn3EkX7rQDyDuZonx0HXDXf4IR_1KrwezOrbeUR4pjV4kwmS89RpgsmkeW04AJXlKaSARG6VNI0-64l8k5QTuhIpxQn2fjDWXERJPkJfFWSwjvNXMTXiHUUz8bcgNuzEFvgK7OZ2gqNHjcfbc3qMC4HhA'
}
```

# Acknowledgements
* These scripts use the excellent [jose](https://github.com/panva/jose) npm module by Filip Skokan.
* Great blog [post](https://medium.com/@darutk/understanding-id-token-5f83f50fa02e) explaining the id_token with gory details :).

