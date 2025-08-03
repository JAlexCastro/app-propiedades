import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarPropiedadesPage } from './listar-propiedades.page';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';



describe('ListarPropiedadesPage', () => {
  let component: ListarPropiedadesPage;
  let fixture: ComponentFixture<ListarPropiedadesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPropiedadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
