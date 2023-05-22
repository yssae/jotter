import { TestBed } from '@angular/core/testing';

import { JtrDialogService } from './jtr-dialog.service';

describe('DialogServiceService', () => {
  let service: JtrDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JtrDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
