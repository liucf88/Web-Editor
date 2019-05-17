import { RouteEventComponent } from "./route-event/route-event.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CompSettingBasicModule } from "src/app/component/basic/comp-setting-basic.module";

const styleComp = [
    RouteEventComponent,
]

@NgModule({
  declarations: [
      [...styleComp]
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CompSettingBasicModule
  ],
  exports: [
    [...styleComp]
  ],
  providers: [

  ],
  bootstrap: [],
  entryComponents:[
    [...styleComp]
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CompEventModule { }