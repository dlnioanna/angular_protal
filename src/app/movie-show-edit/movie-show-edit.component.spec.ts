import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieShowEditComponent } from './movie-show-edit.component';

describe('MovieShowEditComponent', () => {
  let component: MovieShowEditComponent;
  let fixture: ComponentFixture<MovieShowEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieShowEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieShowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
