import { TestBed } from '@angular/core/testing';
import { WinboxService } from './winbox.service';
import { Component } from '@angular/core';
import WinBox from 'winbox';
export type WinBoxOptions = WinBox.Params;

@Component({ selector: 'rbtech-app-welcome', template: '' })
class SimpleComponent {}

describe('WinBoxServiceService', () => {
  let service: WinboxService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleComponent],
      providers: [{ provide: WinBox, useValue: WinBox }],
    });
    service = TestBed.inject(WinboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*test('isThereAWinBox should be equal to true', () => {
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
    expect(service.numberOfWinBoxes).toBeGreaterThan(0);
    expect(service.numberOfWinBoxes).toBe(1);
  });

  test('last winbox should be shown', () => {
    service.openWinBox({}, SimpleComponent);
    const secondWinBox = service.openWinBox({}, SimpleComponent);
    if (secondWinBox) {
      const spy = jest.spyOn(secondWinBox.winBox, 'show');
      service.showLastWinbox();
      expect(spy).toHaveBeenCalled();
    }
  });

  test('number of opened winbox should be decreased', () => {
    const winBoxWrapper = service.openWinBox({}, SimpleComponent);
    expect(service.numberOfWinBoxes).toBe(1);
    if (winBoxWrapper)
      winBoxWrapper.winBox.close();
    expect(service.numberOfWinBoxes).toBe(0);
  });*/
});
