import { TestBed } from '@angular/core/testing';
import { WinboxService } from './winbox.service';
import { Component } from '@angular/core';

@Component({ selector: 'rbtech-app-welcome', template: '' })
class SimpleComponent {}

describe('WinBoxServiceService', () => {
  let service: WinboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [SimpleComponent] });
    service = TestBed.inject(WinboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('isThereAWinBox should be equal to true', () => {
    service.openWinBox({}, SimpleComponent);
    expect(service.isThereAWinBox).toBe(true);
  });

  test('isThereAWinBox should be equal to false', () => {
    service.openWinBox({}, SimpleComponent);
    service.closeAllWinBoxes();
    expect(service.isThereAWinBox).toBe(false);
  });

  test('number of Winbox instances should be greater than 0', () => {
    service.openWinBox({}, SimpleComponent);
    expect(service.numberOfWinboxes).toBeGreaterThan(0);
    expect(service.numberOfWinboxes).toBe(1);
  });
});
