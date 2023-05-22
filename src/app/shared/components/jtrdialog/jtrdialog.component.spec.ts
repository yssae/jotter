import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JtrdialogComponent } from './jtrdialog.component';

describe('JtrdialogComponent', () => {
  let component: JtrdialogComponent;
  let fixture: ComponentFixture<JtrdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JtrdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JtrdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
