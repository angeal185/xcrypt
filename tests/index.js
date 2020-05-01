const xcrypt = require('../lib');

function test(encode, data){
  let obj = {
    key: xcrypt.generateKey(encode),
    key2x: [xcrypt.generateKey(encode), xcrypt.generateKey(encode)],
    key3x: [xcrypt.generateKey(encode), xcrypt.generateKey(encode), xcrypt.generateKey(encode)],
    algo: 'TWOFISH',
    algo2x: ['TWOFISH', 'SERPENT'],
    algo3x: ['TWOFISH', 'SERPENT', 'AES']
  }

  obj.ctext = xcrypt.enc(data, obj.key, obj.algo, encode);
  obj.ptext = xcrypt.dec(obj.ctext, obj.key, obj.algo, encode)

  obj.ctext2x = xcrypt.enc2x(data, obj.key2x, obj.algo2x, encode);
  obj.ptext2x = xcrypt.dec2x(obj.ctext2x, obj.key2x, obj.algo2x, encode);

  obj.ctext3x = xcrypt.enc3x(data, obj.key3x, obj.algo3x, encode);
  obj.ptext3x = xcrypt.dec3x(obj.ctext3x, obj.key3x, obj.algo3x, encode);

  console.log('Test 1x '+ encode +' pass: ' + (obj.ptext === data))
  console.log('Test 2x '+ encode +' pass: ' + (obj.ptext2x === data))
  console.log('Test 3x '+ encode +' pass: ' + (obj.ptext3x === data))
}

test('hex', 'test text')
test('base64', 'test text')
