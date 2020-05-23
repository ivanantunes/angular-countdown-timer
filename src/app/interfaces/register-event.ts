/**
 * @interface RegisterEvent Receive an object containing *name* and *date* to record the event.
 */
export interface RegisterEvent {
  name: string;
  date: Date;
}
