
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TreeItemDropEvent, DropPosition, TreeItemLookup, DropAction } from '@progress/kendo-angular-treeview';
import { Combinacion } from '../interfaces/combinacion';

@Component({
    selector: 'app-tree',
    templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  combinaciones: Combinacion[] = [];
  dragDisabledTypes = ['teacher'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Combinacion[]>('assets/data/combinaciones.json').subscribe(data => {
      this.combinaciones = data;
    });
  }

  public iconClass({ type }: any): any {
    return {
      'k-i-user': type == 'teacher',
      'k-i-folder': type == 'folder',
      'k-i-myspace': type == 'course',
      'k-icon': true
    };
  }

  public getDragStatus(action: DropAction, destinationItem: TreeItemLookup, sourceItem: TreeItemLookup): string {

    if (action != DropAction.Invalid && destinationItem && sourceItem) {
      let source = sourceItem.item.dataItem;
      let destination = destinationItem.item.dataItem;
      console.log(source, destination);

      if(source.type == "teacher" || destination.type == "teacher"){
        return 'k-i-cancel';
      }
      if(source.type == "course" &&  destination.type == "teacher"){
        return 'k-i-cancel';
      }
      if(source.type == "course" &&  destination.type == "course"){
        return 'k-i-cancel';
      }
      if(source.type == "folder" &&  destination.type == "course"){
        return 'k-i-cancel';
      }
    }

    switch (action) {
      case DropAction.Add: return 'k-i-plus';
      case DropAction.InsertTop: return 'k-i-insert-top';
      case DropAction.InsertBottom: return 'k-i-insert-bottom';
      case DropAction.InsertMiddle: return 'k-i-insert-middle';
      case DropAction.Invalid:
      default: return 'k-i-cancel';
    }
  }

  public log(event: string, args?: any): void {
  }

  public handleDrop(event: TreeItemDropEvent): void {
    let source = event.sourceItem.item.dataItem;
    let destination = event.destinationItem.item.dataItem;


    // prevent dropping teachers
    if(source.type == "teacher" || destination.type == "teacher"){
      event.setValid(false);
    }
    // prevent dropping courses into courses
    if(source.type == "course" &&  destination.type == "course"){
      event.setValid(false);
    }
    // prevent dropping folders into courses
    if(source.type == "folder" &&  destination.type == "course"){
      event.setValid(false);
    }
  }
}

