import WebSocket from 'ws';

export default class MessageHandler {
  constructor(private readonly _wss: WebSocket.Server) {}

  public onMessage(data: WebSocket.Data, wsClient: WebSocket): void {
    const response = this.stringifyData(data);
    this.broadcast(response, wsClient);
  }

  public onClose(): void {
    console.log('User disconnected');
  }

  private broadcast(data: string, wsClient: WebSocket): void {
    this._wss.clients.forEach((client) => {
      if (client !== wsClient && client.readyState === WebSocket.OPEN) client.send(data);
    });
  }

  private stringifyData(data: WebSocket.Data): string {
    return data.toString();
  }

  private parceData(data: WebSocket.Data): any {
    return JSON.parse(this.stringifyData(data));
  }
}
