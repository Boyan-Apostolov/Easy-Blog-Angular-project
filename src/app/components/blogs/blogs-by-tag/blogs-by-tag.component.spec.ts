import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsByTagComponent } from './blogs-by-tag.component';

describe('BlogsByTagComponent', () => {
  let component: BlogsByTagComponent;
  let fixture: ComponentFixture<BlogsByTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsByTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
