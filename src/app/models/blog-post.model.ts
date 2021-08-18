import { Section } from '../enums/section';
import { Base } from './base.model';

export class BlogPost {
    base: Base;
    title: string;
    body: string;
    headerImageURL: File;
    youTubeVideoURL: string;
    imageGallery: File[];
    sectionId: number; 
    topicId: number;
    commentIds?: number[];
    homePageImages: File[];
  }