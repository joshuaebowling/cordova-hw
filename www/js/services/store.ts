/// <reference path="../models/domain.d.ts">

import {assign, keys, omit} from 'lodash';

export function get(key: string) : object {
  var result:object = {};
  try {
    result = JSON.parse(window.localStorage.getItem(key));
  } catch {}

  return result;
}

export function save(key: string, value: any) {
  var got = get(key);
  var id = keys(got).length;
  value.id = id;
  window.localStorage.setItem(key, assign({},got, value));
}

export function remove(key: string, id: number) {
  var got = get(key);
  var result: object = omit(got, id);
  window.localStorage.setItem(key, JSON.stringify(result));
}