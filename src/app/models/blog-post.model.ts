import { Section } from '../enums/section';
import { Base } from './base.model';

export class BlogPost {
    base: Base;
    title: string;
    body: string;
    headerImageUrl: string;
    youTubeVideoURL: string;
    imageGallery: string[];
    Section: Section; 
    topicId: number;
    commentIds?: number[];
    homePageImages: string[];
  }