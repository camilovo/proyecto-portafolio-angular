import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: String;
  public filesToUpload: Array<File>;
  public save_project:any;
  public url:string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService

  ) {
    this.status = "";
    this.title = "Crear Proyecto";
    this.project = new Project('','','','',2022,'','');
    this.filesToUpload = new Array();
    this.url = Global.url;
   }


  ngOnInit(): void {
  }

  onSubmit(form:any){
    // Guardar los datos basicos

    this._projectService.saveProject(this.project).subscribe(
      response=> {
        if(response.project){
          //subir la imagen
          if(this.filesToUpload.length){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id,[], this.filesToUpload,'image')
            .then((result:any)=>{
              this.save_project = result.project;
              this.status = 'success'
              form.reset();
            });
          }else{
              this.save_project = response.project;
              this.status = 'success'
              form.reset();
          }
        }else{
          this.status = 'failed'
        }
      },
      error => {
        console.log(<any>error);
      }
    );
    
  }

  fileChangeEvent(fileinput:any){
    this.filesToUpload = <Array<File>>fileinput.target.files;
  }
}
