import test from 'node:test';import assert from 'node:assert/strict';
import {readStored,storageRecoveryEntries,clearStorageRecovery} from '../src/utils/safeStorage.js';
test('wrong JSON shape and invalid JSON are recoverable without overwriting the source',()=>{
 clearStorageRecovery();const values={array:'{}',broken:'[',good:'[1,2]',object:'[]'};const storage={getItem:k=>values[k]};
 assert.deepEqual(readStored('array',[],storage),[]);assert.deepEqual(readStored('broken',[],storage),[]);assert.deepEqual(readStored('good',[],storage),[1,2]);assert.deepEqual(readStored('object',{},storage),{});
 assert.equal(values.array,'{}');assert.equal(storageRecoveryEntries().broken,'[');clearStorageRecovery();
});
