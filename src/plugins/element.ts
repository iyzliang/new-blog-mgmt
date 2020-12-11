import { App } from 'vue'
import { ElLoading, ElTable, ElTableColumn, ElInput, ElButton, ElDialog, ElPopconfirm } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

export function setupElement (app: App) {
  app.component(ElTable.name, ElTable)
  app.component(ElTableColumn.name, ElTableColumn)
  app.component(ElInput.name, ElInput)
  app.component(ElButton.name, ElButton)
  app.component(ElDialog.name, ElDialog)
  app.component(ElPopconfirm.name, ElPopconfirm)
  app.use(ElLoading)
}
