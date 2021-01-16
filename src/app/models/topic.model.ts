import { Section } from '../enums/section';
import { Base } from './base.model';

export class Topic {
    base: Base;
    name: string;
    body: string;
    Section: Section;
  }