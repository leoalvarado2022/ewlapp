import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import { MenuToolbarComponent } from './menu-toolbar/menu-toolbar.component';

@NgModule({
    declarations: [
        MenuToolbarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HttpClientModule,
        ReactiveFormsModule,
        MenuToolbarComponent
    ]
})
export class SharedModule {

}
