import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsByTypeComponent } from './posts-by-type.component';

describe('PostsByTypeComponent', () => {
  let component: PostsByTypeComponent;
  let fixture: ComponentFixture<PostsByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsByTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
