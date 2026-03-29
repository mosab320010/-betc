export class EmailService {
  send(message: { to: string; subject: string; body: string }) {
    return Promise.resolve({ accepted: [message.to] });
  }
}
