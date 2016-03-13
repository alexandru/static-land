import {curry} from './utils'

export const map2 = curry(
  (T, fn, t1, t2) => T.ap(T.map(curry(fn), t1), t2)
)

export const map3 = curry(
  (T, fn, t1, t2, t3) => T.ap(T.ap(T.map(curry(fn), t1), t2), t3)
)

export const ap = curry(
  (T, tf, tx) => T.chain(f => T.map(f, tx), tf)
)

export const reduce = curry(
  (T, fn, seed, tx) => T.toArray(tx).reduce(fn, seed)
)

export const toArray = curry(
  (T, tx) => T.reduce((r, i) => r.concat([i]), [], tx)
)

export const mapViaApplicative = curry(
  (T, fn, tx) => T.ap(T.of(fn), tx)
)

export const mapViaMonad = curry(
  (T, fn, tx) => T.chain(x => T.of(fn(x)), tx)
)

export const traverse = curry(
  (T, Inner, fn, tx) => T.sequence(Inner, T.map(fn, tx))
)

export const join = curry(
  (T, tt) => T.chain(t => t, tt)
)

export const chain = curry(
  (T, fn, tx) => T.join(T.map(fn, tx))
)


export const deriveAll = T => {

  if (T.map2 === undefined && T.ap && T.map) {
    T.map2 = map2(T)
  }

  if (T.map3 === undefined && T.ap && T.map) {
    T.map3 = map3(T)
  }

  if (T.map === undefined && T.of && T.ap) {
    T.map = mapViaApplicative(T)
  }

  if (T.join === undefined && T.chain) {
    T.join = join(T)
  }

  if (T.chain === undefined && T.join) {
    T.chain = chain(T)
  }

  if (T.map === undefined && T.of && T.chain) {
    T.map = mapViaMonad(T)
  }

  if (T.ap === undefined && T.map && T.chain) {
    T.ap = ap(T)
  }

  if (T.reduce === undefined && T.toArray) {
    T.reduce = reduce(T)
  }

  if (T.toArray === undefined && T.reduce) {
    T.toArray = toArray(T)
  }

  if (T.traverse === undefined && T.map && T.sequence) {
    T.traverse = traverse(T)
  }

}