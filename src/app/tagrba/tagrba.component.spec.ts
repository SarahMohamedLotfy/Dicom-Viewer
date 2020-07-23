import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagrbaComponent } from './tagrba.component';

describe('TagrbaComponent', () => {
  let component: TagrbaComponent;
  let fixture: ComponentFixture<TagrbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagrbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagrbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
