import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlotMachineComponent } from './slot-machine/slot-machine.component';
import { FormsModule } from '@angular/forms';
import { SymbolColumnComponent } from './symbol-column-component/symbol-column-component.component';


@NgModule({
  declarations: [
    AppComponent,
    SlotMachineComponent,
    SymbolColumnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
