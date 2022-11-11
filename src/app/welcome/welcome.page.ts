import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    private router: Router,
    private animationCtrl: AnimationController
  ) { 
    
  }

  async ngOnInit() {
    const imgContainer : Element = document.querySelector('.img-container');
    const textContainer : Element = document.querySelector('.container');

    const imgAnimation: Animation = this.animationCtrl.create()
    .addElement(imgContainer)
    .duration(1500)
    .fromTo('opacity', '0', '1');

    const textAnimation: Animation = this.animationCtrl.create()
    .addElement(textContainer)
    .duration(1500)
    .fromTo('opacity', '0', '1');

    await imgAnimation.play();
    await textAnimation.play();

  }

  async start() {
    await Preferences.set({ key: INTRO_KEY, value: 'true' });
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
