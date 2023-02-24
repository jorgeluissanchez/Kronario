
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { cloneDeep } from 'lodash'
import { PicComponent } from './pic/pic.component'

interface IConfig {
  columns: Array<{
    visible: boolean
    size: number
    minSize?: number
    rows: Array<{
      visible: boolean
      size: number
      type: string
      minSize?: number
    }>
  }>
  disabled: boolean
}

const defaultConfig: IConfig = {
  columns: [
    {
      visible: true,
      size: 17,
      minSize: 17,
      rows: [
        { visible: true, size: 100, type: 'A' },
      ],
    },
    {
      visible: true,
      size: 66,
      rows: [
        { visible: true, size: 100, type: 'doc' },
      ],
    },
    {
      visible: true,
      size: 17,
      minSize: 17,
      rows: [
        { visible: true, size: 70, type: 'D' },
        { visible: true, size: 30, type: 'E', minSize: 30 },
      ],
    },
  ],
  disabled: false,
}

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      .bloc {
        height: 100%;
      }

      .explanations {
        padding: 15px;
      }

      .panel {
        font-size: 100px;
        font-weight: bold;
        color: #cccccc;

        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        overflow: hidden;
      }
      .panel > p {
        margin: 0;
      }
      button {
        margin-bottom: 10px;
      }
    `,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  localStorageName = 'angular-split-ws'
  config: IConfig | any = null

  ngOnInit() {
    const localStorage = window.localStorage.getItem(this.localStorageName)
    if (localStorage) {
      this.config =  JSON.parse(localStorage)
    } else {
      this.resetConfig()
    }
  }

  resetConfig() {
    this.config = cloneDeep(defaultConfig)

    localStorage.removeItem(this.localStorageName)
  }

  onDragEnd(columnindex: any, e: { gutterNum: any; sizes: Array<any> }) {
    // Column dragged
    if (columnindex === -1) {
      // Set size for all visible columns
      this.config.columns.filter((c: any) => c.visible === true).forEach((column: any, index: any) => (column.size = e.sizes[index]))
    }
    // Row dragged
    else {
      // Set size for all visible rows from specified column
      this.config.columns[columnindex].rows
        .filter((r: any) => r.visible === true)
        .forEach((row: any, index: any) => (row.size = e.sizes[index]))
    }

    this.saveLocalStorage()
  }

  toggleDisabled() {
    this.config.disabled = !this.config.disabled

    this.saveLocalStorage()
  }

  refreshColumnVisibility() {
    // Refresh columns visibility based on inside rows visibilities (If no row > hide column)
    this.config.columns.forEach((column: any, index: any) => {
      column.visible = column.rows.some((row: any) => row.visible === true)
    })

    this.saveLocalStorage()
  }

  saveLocalStorage() {
    localStorage.setItem(this.localStorageName, JSON.stringify(this.config))
  }
}
