import { DateTimeFormatterPipe } from './date-time-formatter.pipe';

describe('DateTimeFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new DateTimeFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
