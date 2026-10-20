import test from 'node:test'
import assert from 'node:assert/strict'

import { createRandom, hashSeed, sample, shuffle, shuffleWithSeed } from '../js/lib/utils.js'

test('hashSeed devolve sempre o mesmo valor para a mesma entrada', () => {
  assert.equal(hashSeed('biolab'), hashSeed('biolab'))
  assert.notEqual(hashSeed('biolab'), hashSeed('biolab2'))
})

test('createRandom produz uma sequência determinística', () => {
  const a = createRandom('semente')
  const b = createRandom('semente')
  const first = [a(), a(), a()]
  const second = [b(), b(), b()]
  assert.deepEqual(first, second)
})

test('createRandom permanece dentro do intervalo [0, 1)', () => {
  const random = createRandom(42)
  for (let i = 0; i < 200; i += 1) {
    const value = random()
    assert.ok(value >= 0 && value < 1)
  }
})

test('shuffle não altera o array original', () => {
  const original = [1, 2, 3, 4, 5]
  const copy = [...original]
  const shuffled = shuffle(original, createRandom('x'))
  assert.deepEqual(original, copy)
  assert.notDeepEqual(shuffled, copy)
  assert.deepEqual([...shuffled].sort((a, b) => a - b), copy)
})

test('shuffle preserva a quantidade de itens e a unicidade', () => {
  const items = Array.from({ length: 40 }, (_, index) => index)
  const shuffled = shuffle(items, createRandom('único'))
  assert.equal(shuffled.length, items.length)
  assert.equal(new Set(shuffled).size, items.length)
})

test('shuffleWithSeed é reprodutível', () => {
  const items = [1, 2, 3, 4, 5, 6]
  assert.deepEqual(shuffleWithSeed(items, 'seed'), shuffleWithSeed(items, 'seed'))
  assert.notDeepEqual(shuffleWithSeed(items, 'seed'), shuffleWithSeed(items, 'outra'))
})

test('sample sorteia a quantidade pedida sem repetir itens', () => {
  const items = ['a', 'b', 'c', 'd', 'e']
  const chosen = sample(items, 3, createRandom('sample'))
  assert.equal(chosen.length, 3)
  assert.equal(new Set(chosen).size, 3)
})

test('sample devolve todos os itens quando a quantidade é maior ou igual', () => {
  const items = ['a', 'b', 'c']
  assert.deepEqual(sample(items, 5, createRandom('s')), items)
  assert.deepEqual(sample(items, 3, createRandom('s')), items)
})

test('sample preserva a ordem original dos itens sorteados', () => {
  const items = ['a', 'b', 'c', 'd', 'e', 'f']
  const chosen = sample(items, 3, createRandom('ordem'))
  const positions = chosen.map((item) => items.indexOf(item))
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b))
})
