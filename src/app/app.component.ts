import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DialogComponent} from "./dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {State, TodoItem} from "./models/TodoItem";
import {TodoService} from "./service/TodoService";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Observable, of} from "rxjs";
import {MatExpansionPanel} from "@angular/material/expansion";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  panelOpenState = false;
  $tasks?: Observable<TodoItem[]>;
  status?: State;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatExpansionPanel) painel?: MatExpansionPanel;

  constructor(public dialog: MatDialog, private service: TodoService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAll();

  }

  form: FormGroup = new FormGroup({
    descricao: new FormControl(''),
    responsavel: new FormControl(''),
    status: new FormControl(''),
    nome: new FormControl(''),
  });


  getAll() {
    this.service.getAll().subscribe(
      (todos) => {
        todos.forEach(t => {
          let status: State = (<any>State)[t.status];
          t.status = status;
        })
        this.$tasks = of(todos);
      }
    )
  }

  openDialog(obj: TodoItem) {
    let dialog = this.dialog.open(DialogComponent, {
      data: {
        task: obj
      }
    });

    dialog.afterClosed().subscribe(
      ()=>{
        this.getAll();
      }
    )
  }

  delete(obj: TodoItem) {
    obj.status  = (<any>State)[obj.status];
   this.service.delete(obj).subscribe(
      (res) => {
        this._snackBar.open('Tarefa deletada com sucesso', 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.ngOnInit();
      },
      error => {
        this._snackBar.open('Erro ao deletar a tarefa', 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    );

  }

  submit() {
    if (this.form.valid) {
      let todo: TodoItem = {
        name: this.form.value.nome,
        assignedFor: this.form.value.responsavel,
        description: this.form.value.descricao,
        status: this.form.value.status
      }

      this.service.create(todo).subscribe(
        (todo) => {
          this._snackBar.open('Tarefa criada com sucesso', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.painel?.close();
          this.form.reset();
          this.getAll();
        },
        error => {
          this._snackBar.open('Erro ao criar a tarefa', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      )

    }

  }
}
