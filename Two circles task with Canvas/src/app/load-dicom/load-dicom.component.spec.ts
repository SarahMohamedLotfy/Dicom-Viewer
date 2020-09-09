import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDicomComponent } from './load-dicom.component';

describe('LoadDicomComponent', () => {
  let component: LoadDicomComponent;
  let fixture: ComponentFixture<LoadDicomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadDicomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDicomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
