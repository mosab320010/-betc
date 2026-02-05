export class LoggerService {
  info(message: string) {
    console.log(message);
  }

  error(message: string) {
    console.error(message);
  }
}
