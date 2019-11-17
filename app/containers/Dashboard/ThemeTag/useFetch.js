import { useEffect, useState } from 'react';
import request from '../../utils/request';

const useFetch = props => {
  const [data, setData] = useState(props.default || {});

  useEffect(() => {
    const options = {
      mode: 'cors',
      headers: { Authorization: `Bearer ${props.token}` },
    };

    request(`${props.url}`, options)
      .then(response => setData(response))
      .catch(() => {});
  }, []);

  return data;
};

export default useFetch;
