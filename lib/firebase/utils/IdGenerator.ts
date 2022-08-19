const AUTO_ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const firestoreAutoId = () => {
  let autoId = '';

  for (let i = 0; i < 20; i++) {
    autoId += AUTO_ID_CHARS.charAt(
      Math.floor(Math.random() * AUTO_ID_CHARS.length)
    );
  }

  return autoId
}

export default firestoreAutoId