import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Distrito } from '../dto/Localizacion.dto';

@Component({
  selector: 'buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  @Input() nombreModal: string;
  @Input() datos: Array<Distrito>; 
  @Output() searched = new EventEmitter<any>();

  filtered: Array<Distrito> = [];
  constructor(private animation: AnimationController) { }

  ngOnInit() {
    
  }

  filterData(e) {
    const criteria = e.target.value;
    this.filtered = this.datos.filter( (v: Distrito) => v.nombre.toLocaleLowerCase().indexOf(criteria.toLocaleLowerCase()) >= 0);
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animation
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animation
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animation
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  onWillDismiss(e) {
    this.searched.emit(e.detail.data);
  }
}
