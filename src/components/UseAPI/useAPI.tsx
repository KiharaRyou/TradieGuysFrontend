import { useState, useCallback } from 'react';
import request from '@/utils/request';
import { urlWithKey } from './utils';
import { showErrors } from '@/utils/utils';

const serialize = function(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

export default function useAPI({url, fetchOptions, handleError}) {
   
    const [data, setData] = useState({
        results: []
    })

    const [filter, setFilter] = useState({
        page: 1
    })

    const [loading, setLoading] = useState(false)

    const read = async params => {
        setLoading(true);
        const newFilter = {...filter, ...params};
        newFilter.page = params && params.current ? params.current : 1;
        const query = serialize(newFilter);
        const res = await request(`${url}?${query}`);
        setLoading(false);
        if(res && !res.error) {
            setData(res);
            setFilter(newFilter);
            return res;
        }
    }

    const getDetail = async key => {
        setLoading(true);
        const res = await request(urlWithKey(url, key));
        setLoading(false);
        if(res && !res.error) {
            return res;
        }
    }

    const create = async (params, callback) => {
        setLoading(true);
        const res = await request(url, {data: params, method: 'POST'});
        setLoading(false);
        if(res && res.ok !== false) {
            //read();
            if(callback) {
                callback()
            }
            return res;
        } else {
            showErrors(res)
        }
    }

    const update = async(key, params, callback) => {
        setLoading(true);
        const res = await request(`${urlWithKey(url, key)}/`, {data: params, method: 'PUT'}, handleError);
        setLoading(false);
        if(res && !res.error) {
            //read();
            callback();
            return res;
        }
    }

    const del = async key => {
        setLoading(true);
        const res = await request(urlWithKey(url, key), {...fetchOptions, method: 'DELETE'}, handleError);
        setLoading(false);
        if(res && !res.error) {
            //read();
            return res;
        }
    }

    return {
        create: useCallback(create, []),
        data,
        del: useCallback(del, []),
        filter,
        getDetail: useCallback(getDetail, []),
        loading,
        read: useCallback(read, []),
        update: useCallback(update, [])
    }
}