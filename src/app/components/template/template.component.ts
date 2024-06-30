import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  usuario: any = {
    nombre: null,
    apellido: null,
    email: null,
    pais: '',
    genero: null,
    aceptar: false
  };

  paises: any = [
    {
      codigo: 'CRI',
      desc: 'Costa Rica'
    },
    {
      codigo: 'ESP',
      desc: 'España'
    },
    {
      codigo: 'MEX',
      desc: 'Mexico'
    }
  ];

  generos: any = [
    {
      codigo: 'M',
      desc: 'Masculino'
    },
    {
      codigo: 'F',
      desc: 'Femenino'
    }
  ];

  constructor() { }

  save(form: NgForm) {
    console.log('Form', form);
    console.log('Value', form.value);
    console.log('Usuario', this.usuario);
  }

}
