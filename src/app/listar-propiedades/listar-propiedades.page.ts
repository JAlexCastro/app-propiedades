import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular'; // Componentes Ionic y controlador de alertas
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Preferences } from '@capacitor/preferences'; // Plugin para almacenamiento local

@Component({
  selector: 'app-listar-propiedades',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './listar-propiedades.page.html',
  styleUrls: ['./listar-propiedades.page.scss'],
})
export class ListarPropiedadesPage implements OnInit {
  propiedades: any[] = [];  // Arreglo que almacena las propiedades cargadas

  constructor(private alertCtrl: AlertController) { } // Inyeccion del servicio de alertas

  ngOnInit() {
    this.cargarPropiedades(); // Carga las propiedades al iniciar el componente
  }

  // Recupera las propiedades guardadas en almacenamiento local
  async cargarPropiedades() {
    const { value } = await Preferences.get({ key: 'propiedades' });
    this.propiedades = value ? JSON.parse(value) : [];
  }

  // Muestra una alerta modal para confirmar la eliminación de una propiedad
  async confirmarEliminacion(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta propiedad?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            this.propiedades.splice(index, 1);  // Elimina la propiedad del arreglo
            await Preferences.set({              // Actualiza el almacenamiento local
              key: 'propiedades',
              value: JSON.stringify(this.propiedades),
            });
          },
        },
      ],
    });
    await alert.present(); // Muestra la alerta en pantalla
  }
}
