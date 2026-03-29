export class AIIntegrationService {
  summarize(text: string) {
    return `Summary for: ${text.slice(0, 50)}`;
  }
}
