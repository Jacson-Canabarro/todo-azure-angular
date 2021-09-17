import {Component, Inject, OnInit, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {State, TodoItem} from "../models/TodoItem";
import {TodoService} from "../service/TodoService";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  form: FormGroup = new FormGroup({
    descricao: new FormControl(this.data.task.description),
    responsavel: new FormControl(this.data.task.assignedFor),
    status: new FormControl(''),
    nome: new FormControl(this.data.task.name),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private todoService: TodoService,
              private _snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      let todo: TodoItem = {
        id: this.data.task.id,
        name: this.form.value.nome,
        assignedFor: this.form.value.responsavel,
        description: this.form.value.descricao,
        status: this.form.value.status
      }
      this.todoService.update(todo).subscribe(
        ()=>{
          this._snackBar.open('Tarefa atualizada com sucesso', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.dialogRef.close();

        },
        error => {
          this._snackBar.open('Erro ao atualizar a tarefa', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      );
    }
  }
}
