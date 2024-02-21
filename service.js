import { constants, generateKeyPairSync, privateDecrypt, publicEncrypt, sign, verify } from 'crypto';
import { existsSync, readFileSync, writeFileSync } from 'fs';

export function getKeyPair() {
  if (existsSync('./rsa.pub')) {
    return {
      publicKey: readFileSync('./rsa.pub'),
      privateKey: readFileSync('./rsa')
    }
  }


  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048
  });

  writeFileSync('./rsa.pub', publicKey.export({
    type: "pkcs1",
    format: "pem",
  }));

  writeFileSync('./rsa', privateKey.export({
    type: "pkcs1",
    format: "pem",
  }));

  return {
    publicKey: readFileSync('./rsa.pub'),
    privateKey: readFileSync('./rsa')
  };
};

export function getEncryptedData(publicKey) {
  if (existsSync('./encrypted_data')) {
    return readFileSync('./encrypted_data');
  }

  const data = "my secret data";

  const encryptedData = publicEncrypt(
    {
      key: publicKey,
      padding: constants.RSA_PKCS1_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(data)
  );

  writeFileSync('./encrypted_data', encryptedData);

  return readFileSync('./encrypted_data');
}

export function decryptData({ data, privateKey }) {
  return privateDecrypt({
      key: privateKey,
      padding: constants.RSA_PKCS1_PADDING,
      oaepHash: "sha256",
    }, data).toString();
}

export function mySign({ data,  privateKey }) {
  return sign("sha256", Buffer.from(data), {
    key: privateKey,
    padding: constants.RSA_PKCS1_PSS_PADDING,
  })
}

export function verifySignature({ data, signature, publicKey }) {
  return verify(
    "sha256",
    Buffer.from(data),
    {
      key: publicKey,
      padding: constants.RSA_PKCS1_PSS_PADDING,
    },
    signature
  );
}
