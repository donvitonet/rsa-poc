import { decryptData, getEncryptedData, getKeyPair, mySign, verifySignature } from "./service.js";

const { privateKey, publicKey } = getKeyPair();
const encryptedData = getEncryptedData({ data: 'my secret data', publicKey });
const decryptedData = decryptData({ data: encryptedData, privateKey })
console.log('Decrypted Data:', decryptedData);

const verifiableData = "this need to be verified"
const signature = mySign({ data: verifiableData, privateKey });
const isVerified = verifySignature({ data: verifiableData, signature, publicKey });
console.log('isVerified:', isVerified);

