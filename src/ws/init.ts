import http from 'http';
import WebSocket from 'ws';

import { Routes } from '../../configs';
import MessageHandler from './MessageHadler';

class WebSocketServer {
  private _wss: WebSocket.Server;
  private _msgHandler: MessageHandler;

  constructor(server: http.Server, prefix: string = '') {
    this._wss = new WebSocket.Server({
      server,
      path: `${prefix}${Routes.ws}`,
    });

    this._msgHandler = new MessageHandler(this._wss);

    this.init();
  }

  private init(): void {
    this._wss.on('connection', this.connect.bind(this));
    this._wss.on('close', this.close.bind(this));
    this._wss.on('error', this.error.bind(this));
  }

  private connect(wsClient: WebSocket): void {
    wsClient.on('message', (data) => this._msgHandler.onMessage(data, wsClient));
    wsClient.on('close', this._msgHandler.onClose);
  }

  private close(): void {
    console.log('Underlying server was shut down');
  }

  private error(error: Error): void {
    console.error('Underlying server was shut down with an exception', error);
  }
}

export default WebSocketServer;
