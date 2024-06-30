import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  form: FormGroup;

  usuario: any = {
    nombreCompleto: {
      nombre: 'Yeisson',
      apellido: 'Ochoa'
    },
    email: 'yeisson.ochoa72@gmail.com',
    pasatiempos: []
  };

  constructor() {
    console.log(this.usuario);

    this.form = new FormGroup({
      nombreCompleto: new FormGroup({
        nombre: new FormControl('', [
          // Aplicamos validación de campo requerido
          Validators.required,
          // Aplicamos validación de minima cantidad de caracteres
          Validators.minLength(5)
        ]),
        apellido: new FormControl('', [
          // Aplicamos validación de campo requerido
          Validators.required,
          // Validación personalizada
          this.noHerrera
        ])
      }),
      email: new FormControl('', [
        // Aplicamos validación de campo requerido
        Validators.required,
        // Aplicamos validación de patron
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      pasatiempos: new FormArray([
        new FormControl('Cine', [
          Validators.required
        ])
      ]),
      username: new FormControl('', [
        // Aplicamos validación de campo requerido
        Validators.required
      ], [
        // Validación personalizada asincrona
        this.existUser
      ]),
      password: new FormControl('', [
        // Aplicamos validación de campo requerido
        Validators.required
      ]),
      passwordConfirm: new FormControl()
    });

    // Asignar valores al formulario usando un objeto,
    // si tiene la misma estructura podemos hacer:
    // this.form.setValue(this.usuario);
    //
    // o se puede hacer:
    // this.form.setValue({
    //    nombreCompleto: {
    //      nombre: this.usuario['nombreCompleto.nombre'],
    //      apellido: this.usuario['nombreCompleto.apellido']
    //    },
    //    email: this.usuario['email']
    // });
    // this.form.setValue(this.usuario);

    // Otra forma de asignar las validaciones que tendrá un control
    this.form.controls['passwordConfirm'].setValidators([
      // Aplicamos validación de campo requerido
      Validators.required,
      // Debemos especificarle el valor de this
      // que tendrá la función al momento de ejecutarse.
      // Dado que el contexto ya no es el mismo
      this.notEqual.bind(this.form)
    ]);

    // Para escuchar algún cambio en el formulario,
    // en un control especifico
    this.form.controls['username'].valueChanges
        .subscribe((data: any) => {
            console.log(data);
        });

    // Para escuchar algún cambio en el estado,
    // en un control especifico
    this.form.controls['username'].statusChanges
        .subscribe((data: any) => {
            console.log(data);
        });
  }

  save() {
    console.log(this.form.value);
    console.log(this.form);

    // Para resetear el formulario podemos hacerlo así:
    // this.form.reset();
    //
    // o si queremos asignarle un valor por defecto
    // a los campos del formulario lo podemos hacer así:
    // this.form.reset({
    //  nombreCompleto: {
    //    nombre: '',
    //    apellido: ''
    //  },
    //  email: ''
    // });
    this.form.reset({
      nombreCompleto: {
        nombre: '',
        apellido: ''
      },
      email: ''
    });
  }

  agregarPasatiempo() {
    // Usamos (<FormArray>...) para indicarle a angular
    // que confie que aquello es un array
    (<FormArray>this.form.controls['pasatiempos'])
      .push(new FormControl('', [
        Validators.required
      ]));
  }

  // Usamos la forma {[s:string]:boolean}
  // para declarar un par de valores a devolver
  noHerrera(control: FormControl): {[s:string]:boolean} {
    if (control.value === 'herrera') {
      return {
        noherrera: true
      };
    }

    return null;
  }

  // Usamos la forma {[s:string]:boolean}
  // para declarar un par de valores a devolver
  notEqual(control: FormControl): {[s:string]:boolean} {
    // Debemos obtener el nuevo this indicado
    // al momento de asignar la validación personalizado
    let form: any = this;

    if (control.value !== form.controls['password'].value) {
      return {
        notequal: true
      };
    }

    return null;
  }

  // Para las validaciones asincronas
  // debemos de devolver una promesa o bien un observable.
  // En este caso devolvemos algo es porque la validación fallo,
  // en caso contrario si devolvemos null significa que todo OK
  existUser(control: FormControl): Promise<any> | Observable<any> {
    const promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve({
            existe: true
          });
        } else {
          resolve(null);
        }
      }, 3000);
    });

    return promesa;
  }
}
