import { ModalTypes } from './modal-types';

/**
 * @interface ModalAlert Using to generate the modal alert.
 */
export interface ModalAlert {
  controlType: ModalTypes;
  title: string;
  description: string;
}
