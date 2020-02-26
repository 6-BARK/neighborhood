import http from 'k6/http';
import { sleep } from 'k6';

export default function() {
  http.get(`http://50.18.212.28:3003/api/listings/${Math.ceil(Math.random() * 10000000)}`);
  sleep(1);
}