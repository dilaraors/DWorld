import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from 'src/app/enums/section';
import { BlogPost } from 'src/app/models/blog-post.model';
import { BlogPostService } from 'src/app/services/blog-post/blog-post.service';
import { SectionService } from 'src/app/services/section/section.service';
import { TopicService } from 'src/app/services/topic/topic.service';

@Component({
  selector: 'app-blog-post-add-edit',
  templateUrl: './blog-post-add-edit.component.html',
  styleUrls: ['./blog-post-add-edit.component.css']
})
export class BlogPostAddEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  postId: number;
  errorMessage: any;
  existingBlogPost: BlogPost;
  topics;
  sections;
  headerImage = '';
  headerImageFile: File;
  imageFiles: File[];
  url = '';
  images = [];
  selectedSection;

  constructor(private blogPostService: BlogPostService, private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute, private router: Router, private topicService: TopicService,
    private sanitizer: DomSanitizer, private sectionService: SectionService) {
    const idParam = 'id';
    this.actionType = 'Add';
    if (this.avRoute.snapshot.params[idParam]) {
      this.postId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
        topic: ['', [Validators.required]],
        section: ['', [Validators.required]],
        file: [''],
        files: [''],
        videoURL: ['']
      }
    );

    this.getTopics();
    this.getSections();

    if (this.postId > 0) {
      this.actionType = 'Edit';
      this.getBlogPost(this.postId);
    }
  }

  ngOnInit(): void {
  }

  getBlogPost(postId) {
    this.blogPostService.getBlogPost(postId)
      .subscribe(data => {
        debugger;
        this.existingBlogPost = data["result"];
        let topic = this.topics.find(x => x.id == data["result"].topicId);
        let section = this.sections.find(x => x.id == data["result"].sectionId);
        // this.form.controls['id'].setValue(data["result"].id);
        this.form.controls['title'].setValue(this.existingBlogPost.title);
        this.form.controls['body'].setValue(this.existingBlogPost.body);
        this.form.controls['topic'].setValue(topic);
        this.form.controls['section'].setValue(section);
        //this.form.controls['file'].setValue(this.existingBlogPost.headerImageURL);
        //this.form.controls['files'].setValue(this.existingBlogPost.imageGallery);
        // this.form.controls['videoURL'].setValue(this.existingBlogPost.youTubeVideoURL);
        this.url = this.existingBlogPost.youTubeVideoURL.toString();
        this.form.controls['videoURL'].setValue(this.url);
        this.headerImage = this.existingBlogPost.headerImageURL.toString();
        this.images = this.existingBlogPost.imageGallery;
      }
      );
  }

  get f() {
    return this.form.controls;
  }

  getTopics() {
    this.topicService.get().subscribe(topic => {
      this.topics = topic.result.data;
      console.log("topics", this.topics);
    });
  }

  getSections() {
    this.sectionService.get().subscribe(section => {

      console.log("ddsfs", section);
      this.sections = section.result.data;
    });

  }
  getTopicsBySection() {

    this.topicService.getBySectionId(this.selectedSection.id).subscribe(topics => {
      debugger;
      this.topics = topics.result.data;
    });
    console.log(this.selectedSection);
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let formData: FormData = new FormData();
      formData.append('Title', this.form.value.title);
      formData.append('Body', this.form.value.body);
      formData.append('TopicId', this.form.value.topic.id);
      formData.append('SectionId', this.form.value.section.id);
      formData.append('HeaderImageFile', this.headerImageFile);
      // formData.append('ImageGalleryFile', this.imageFiles);
      formData.append('YouTubeVideoURL', this.form.value.videoURL);

      this.blogPostService.addBlogPost(formData)
        .subscribe((data) => {
          this.router.navigate(['/blogposts']);
        });
    }
    else if (this.actionType === 'Edit') {
      let formData: FormData = new FormData();
      formData.append('Id', this.postId.toString());
      formData.append('Title', this.form.value.title);
      formData.append('Body', this.form.value.body);
      formData.append('TopicId', this.form.value.topic.id);
      formData.append('SectionId', this.form.value.section.id);
      formData.append('HeaderImageFile', this.headerImageFile);
      
      for (var file of this.imageFiles) {
        formData.append('ImageGalleryFile', file);
      }
      formData.append('YouTubeVideoURL', this.form.value.videoURL);
      
      this.blogPostService.updateBlogPost(formData)
        .subscribe((data) => {
          this.router.navigate(['/blogposts']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.headerImageFile = event.target.files[0];

      const reader = new FileReader();

      reader.readAsDataURL(this.headerImageFile);
      reader.onload = event => this.headerImage = event.target.result.toString();
    }
  }

  onImageArrayChange(event) {
    this.images = [];
    this.imageFiles = event.target.files;
    if (this.imageFiles) {
      for (let file of this.imageFiles) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          debugger;
          let url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result)["changingThisBreaksApplicationSecurity"];
          this.images.push(url);
        }
      }
    }
  }

}
