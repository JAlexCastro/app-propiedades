import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-crear-propiedad',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './crear-propiedad.page.html',
  styleUrls: ['./crear-propiedad.page.scss'],
})
export class CrearPropiedadPage {
  formulario: FormGroup;    // Formulario reactivo para capturar datos de la propiedad
  foto: string | null = null; // Almacena la foto tomada en formato DataURL

  constructor(private fb: FormBuilder, private router: Router) {
    // Inicializa el formulario con validaciones para cada campo
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      precio: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  // Getters para facilitar acceso a los controles del formulario y sus estados
  get titulo() {
    return this.formulario.get('titulo')!;
  }

  get precio() {
    return this.formulario.get('precio')!;
  }

  get descripcion() {
    return this.formulario.get('descripcion')!;
  }

  // Función para tomar foto usando la cámara del dispositivo
  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, // Obtenemos la imagen como Data URL para mostrar fácilmente
      source: CameraSource.Camera,
    });
    this.foto = image.dataUrl!;
  }

  // Guarda la nueva propiedad si el formulario es válido
  async guardar() {
    if (this.formulario.valid) {
      // Construye un objeto con los datos del formulario y la foto
      const nuevaPropiedad = {
        ...this.formulario.value,
        foto: this.foto,
      };

      // Recupera la lista actual de propiedades almacenadas localmente
      const { value } = await Preferences.get({ key: 'propiedades' });
      const propiedades = value ? JSON.parse(value) : [];

      // Añade la nueva propiedad al arreglo
      propiedades.push(nuevaPropiedad);

      // Guarda la lista actualizada en almacenamiento local
      await Preferences.set({
        key: 'propiedades',
        value: JSON.stringify(propiedades),
      });

      // Navega de regreso a la pantalla principal (listado)
      this.router.navigate(['/']);
    }
  }
}
