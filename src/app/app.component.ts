import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Listdo } from 'src/models/listdo.model';

@Component({
  selector: 'app-root', // <app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: String = 'list';
  public listdos: Listdo[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;
  
  constructor(private fb: FormBuilder) { //ctor + tab (Criar constructor)
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

    this.load();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.listdos.length + 1;
    this.listdos.push(new Listdo(id, title, false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(listdo: Listdo) {
    const index = this.listdos.indexOf(listdo);
    if(index !== -1){
      this.listdos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(listdo: Listdo) {
    listdo.done = true;
    this.save();
  }

  markAsUndone(listdo: Listdo) {
    listdo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.listdos);
    localStorage.setItem('listdos', data);
    this.mode = 'list';
  }

  load() {
    const data = localStorage.getItem('listdos');
    if(data){
      this.listdos = JSON.parse(data);
    }else{
      this.listdos = [];
    }
  }

  changeMode(mode: String) {
    this.mode = mode;
  }
}
