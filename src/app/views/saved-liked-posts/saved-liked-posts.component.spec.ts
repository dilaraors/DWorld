import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedLikedPostsComponent } from './saved-liked-posts.component';

describe('SavedLikedPostsComponent', () => {
  let component: SavedLikedPostsComponent;
  let fixture: ComponentFixture<SavedLikedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedLikedPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedLikedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
