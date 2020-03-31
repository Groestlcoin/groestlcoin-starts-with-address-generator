const b = require ('groestlcoinjs-lib');

/**
 * @param {string} startsWith (case insensitive) text at the beginning of the generated groestlcoin address
 * @return {string} groestlcoin public key address that starts with '1<startsWith>'
 */
const genAddrStartsWith = startsWith => {
  if (startsWith) {
    let found = false;
    let key;
    while (!found) {
      const keyPair = b
      .ECPair.makeRandom();
      const {address} = b.payments.p2pkh ({pubkey: keyPair.publicKey});
      if (address && address.toLowerCase ().startsWith ('F' + startsWith)) {
        found = true;
        key = address;
      }
    }
    return key;
  } else return 'please provide a string';
};

/**
 * @return {string} starts with string from command line args
 */
const getStartsWith = () => {
  if (process.argv.length < 3) {
    return '';
  } else {
    return process.argv[2];
  }
};

/**
 * Entry point
 */
(() => console.log (genAddrStartsWith (getStartsWith ()))) ();
