import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute , Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: String;
  public filesToUpload: Array<File>;
  public save_project:any;
  public url:string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private  _route: ActivatedRoute

  ) {
    this.status = "";
    this.title = "Editar proyecto";
    this.project = new Project('','','','',2022,'','');
    this.filesToUpload = new Array();
    this.url = Global.url;
   }

   ngOnInit(): void {
    this._route.params.subscribe(params => {

      let id = params['id'];

      this.getProject(id);
    });
  }

  getProject(id:any){
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error=>{
        console.log(<any>error);
        
      }
    )
  }

  onSubmit(form:any){
    this._projectService.updateProject(this.project).subscribe(
      response =>{
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
          }
          
        }else{
          this.status = 'failed'
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileinput:any){
    this.filesToUpload = <Array<File>>fileinput.target.files;
  }
}
