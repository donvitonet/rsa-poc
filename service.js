import { constants, generateKeyPairSync, privateDecrypt, publicEncrypt, sign, verify } from 'crypto';

export function getKeyPair() {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048
  });

  return {
    publicKey: exportKey(publicKey),
    privateKey: exportKey(privateKey)
  };
};

export function exportKey(keyObject) {
  return keyObject.export({
    type: 'pkcs1',
    format: 'pem'
  })
}

export function getEncryptedData(publicKey) {
  return publicEncrypt(
    {
      key: publicKey,
      padding: constants.RSA_PKCS1_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from('my secret data')
  );
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
