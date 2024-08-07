import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentRef,
  createComponent,
  Injectable,
  Type,
} from '@angular/core';
import 'winbox';

declare const WinBox: WinBox.WinBoxConstructor;

export type WinBoxOptions = WinBox.Params;

export interface WinBoxContainer<ComponentInstance> {
  winBox: WinBox;
  instance: ComponentInstance;
  changeDetectorRef?: ChangeDetectorRef;
}

@Injectable({ providedIn: 'root' })
export class WinboxService {
  private winBoxStack: WinBox[] = [];
  public isThereAWinBox = false;

  constructor(private appRef: ApplicationRef) {}
  get numberOfWinBoxes(): number {
    return this.winBoxStack.length;
  }

  openWinBox<ComponentInstance>(
    options: WinBoxOptions,
    component: Type<ComponentInstance>,
  ): WinBoxContainer<ComponentInstance> {
    const winBox = new WinBox(options);

    const componentRef = createComponent(component, {
      environmentInjector: this.appRef.injector,
      hostElement: winBox.body,
    });
    this.appRef.attachView(componentRef.hostView);

    // estensione del metodo per permettere all'utente di passare
    // una funzione da invocare alla chiusura della winBox
    const optionsClose = options.onclose;
    winBox.onclose = (force) => {
      if (force) {
        return this.destroyComponent<ComponentInstance>(componentRef, winBox);
      }
      const isCloseConfirmed = optionsClose?.apply(winBox, [force]);
      if (isCloseConfirmed || !optionsClose) {
        return this.destroyComponent<ComponentInstance>(componentRef, winBox);
      }
      return true;
    };
    this.isThereAWinBox = true;
    this.winBoxStack.push(winBox);
    winBox.hide();
    return {
      winBox,
      instance: componentRef.instance,
      changeDetectorRef: componentRef.injector.get(ChangeDetectorRef),
    };
  }

  public closeAllWinBoxes() {
    for (const winBox of this.winBoxStack) {
      winBox.close(true);
    }
    this.winBoxStack = [];
    this.isThereAWinBox = false;
  }

  /** This method show the last Winbox created*/
  public showLastWinbox() {
    if (this.winBoxStack.length > 0)
      this.winBoxStack[this.winBoxStack.length - 1].show();
  }

  /** This method minimize a Winbox selected by id*/
  public minimizeWinbox(id: string | number, state: boolean) {
    this.winBoxStack.find((winbox) => winbox.id === id)?.minimize(state);
  }

  /**
   * This method maximizes or restores a Winbox identified by its id.
   *
   * @param id - The id of the Winbox to be maximized or restored. It can be either a string or a number.
   * @param state - A boolean value indicating whether to maximize or restore the Winbox.
   *   - If `true`, the Winbox will be maximized.
   *   - If `false`, the Winbox will be restored to its previous state.
   *
   * @returns {void} This method does not return any value.
   */
  public maximizeWinbox(id: string | number, state: boolean) {
    this.winBoxStack.find((winbox) => winbox.id === id)?.maximize(state);
  }

  private destroyComponent<ComponentInstance>(
    componentRef: ComponentRef<ComponentInstance>,
    winBox: WinBox,
  ): boolean {
    componentRef.destroy();
    this.winBoxStack = this.winBoxStack.filter((w) => w.id !== winBox.id);
    this.isThereAWinBox = this.winBoxStack.length !== 0;
    return false;
  }
}
