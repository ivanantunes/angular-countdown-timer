/**
 * @interface RegisterEvent Receive an object containing *name* and *date* to record the event.
 */
export interface RegisterEvent {
  registeredDate: string;
  eventName: string;
  eventStatus: 'A' | 'I' | 'E';
}
