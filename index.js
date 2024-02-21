import { decryptData, getEncryptedData, getKeyPair, mySign, verifySignature } from "./service.js";

const { privateKey, publicKey } = getKeyPair();
const encryptedData = getEncryptedData(publicKey);
const decryptedData = decryptData({ privateKey, data: encryptedData })
console.log('Decrypted Data:', decryptedData);

const verifiableData = "this need to be verified"
const signature = mySign({ data: verifiableData, privateKey });
const isVerified = verifySignature({ data: verifiableData, signature, publicKey });
console.log('isVerified:', isVerified);

