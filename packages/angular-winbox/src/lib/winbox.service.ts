import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
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

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  get numberOfWinBoxes(): number {
    return this.winBoxStack.length;
  }

  openWinBox<ComponentInstance>(
    options: WinBoxOptions,
    component: Type<ComponentInstance>
  ): WinBoxContainer<ComponentInstance> {
    const winBox = new WinBox(options);

    const portalHost = new DomPortalOutlet(
      winBox.body,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );

    // Locate the component factory for the HeaderComponent
    const portal = new ComponentPortal(component);

    // Attach portal to host
    const componentRef = portalHost.attach(portal);

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

  /** This method maximize a Winbox selected by id*/
  public maximizeWinbox(id: string | number, state: boolean) {
    this.winBoxStack.find((winbox) => winbox.id === id)?.maximize(state);
  }

  private destroyComponent<ComponentInstance>(
    componentRef: ComponentRef<ComponentInstance>,
    winBox: WinBox
  ): boolean {
    componentRef.destroy();
    this.winBoxStack = this.winBoxStack.filter((w) => w.id !== winBox.id);
    this.isThereAWinBox = this.winBoxStack.length !== 0;
    return false;
  }
}
