import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsSavedComponent } from './blogs-saved.component';

describe('BlogsSavedComponent', () => {
  let component: BlogsSavedComponent;
  let fixture: ComponentFixture<BlogsSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsSavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
