import http from 'http';
import WebSocket from 'ws';
import { Routes } from '../../configs';

export default function init(server: http.Server, prefix: string = ''): WebSocket.Server {
  const wss = new WebSocket.Server({
    server,
    path: `${prefix}${Routes.ws}`,
  });

  return wss;
}
