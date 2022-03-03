import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare const $: any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchura:number;
  @Input('etiquetas') captions: boolean;
  @Output() conseguirAutor = new EventEmitter();

  public autor:any;

  constructor() {
    this.anchura = 0;
    this.captions = false;
    this.autor = {
      nombre : "Juan Camilo Ortiz",
      website: "No se tiene",
      youtube: "Tampoco se tiene"
    }
   }

  ngOnInit(): void {
    $("#logo").click(function (e:any) {
      e.preventDefault();
      $("header")
          .css("background", "green")
          .css("height", "50px");
 
    });

    
    $('.galeria').bxSlider({
      mode: 'fade',
      captions: true,
      slideWidth: this.anchura,
      Responsive: true,
      pager: false 
  });
  }

  lanzar(event:any){
    console.log(event);
    this.conseguirAutor.emit(this.autor);
  }

}
