import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IyziPayComponent } from './iyzi-pay.component';

describe('IyziPayComponent', () => {
  let component: IyziPayComponent;
  let fixture: ComponentFixture<IyziPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IyziPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IyziPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
