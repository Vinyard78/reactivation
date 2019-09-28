import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClasseDialogComponent } from './add-classe-dialog.component';

describe('AddClasseDialogComponent', () => {
  let component: AddClasseDialogComponent;
  let fixture: ComponentFixture<AddClasseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClasseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClasseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
