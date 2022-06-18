import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  confirmarSenha: string
  tipoUser: string

constructor(
  private auth: AuthService,
  private route: ActivatedRoute,
  private router: Router,
  private alertas: AlertasService,
) { }

  ngOnInit() {

    window.scroll(0,0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Para fazer alteração no perfil é preciso estar logado.');
      this.router.navigate(['/entrar']);
    }

    let id = this.route.snapshot.params['id'];
    this.buscarUsuario(id);
  }

  buscarUsuario(id: number) {
    this.auth.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;
      this.usuario.senha = ''
      
    });
  }

confirmSenha(event: any) {
  this.confirmarSenha = event.target.value
}


tipoUsuario(event: any) {
  this.confirmarSenha = event.target.value
}

findByIdUsuario(id: number) {
  this.auth.getByIdUsuario(id).subscribe((resp: Usuario) => {
  this.usuario = resp
  })
  }

  atualizar() {
    this.usuario.tipo = this.tipoUser

    if (this.usuario.senha != this.confirmarSenha) {
    this.alertas.showAlertDanger('As senhas estão incorretas.')
    } else {
      this.auth.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.alertas.showAlertSuccess('Usuário atualizado com sucesso! Faça login novamente.')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/entrar'])

      })
    }
  }

}