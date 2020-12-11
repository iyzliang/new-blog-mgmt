<template>
  <div class="view-container tag-list">
    <div class="container-handle">
      <div class="handle-input">
        <el-input v-model="searchRef" placeholder="查询标签名称" @change="changeTagName"></el-input>
      </div>
      <div class="handle-button">
        <el-button type="success" round @click="showTagItem">新增标签</el-button>
      </div>
    </div>
    <div class="container-tabel">
      <el-table :data="tagListRef" v-loading="tableLoading">
        <el-table-column
          align="center"
          label="标签ID"
          width="100px"
          prop="tagId">
        </el-table-column>
        <el-table-column
          label="标签名"
          prop="tagName">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime">
        </el-table-column>
        <el-table-column
          align="center"
          label="状态"
          width="100px">
          <template #default="scope">
              <span :class="scope.row.status ? 'active-state' : 'inactive-state'">{{ scope.row.status ? '已激活' : '未激活' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="200px">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            confirmButtonText='确定'
            cancelButtonText='取消'
            icon="el-icon-info"
            iconColor="red"
            :title="`确定删除标签${scope.row.tagId}吗？`"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="tagNameType ? '编辑标签' : '新增标签'"
      v-model="tagDialog"
      width="30%"
      center
      v-loading="newTagLoading">
      <el-input v-model="tagNameValue" placeholder="新增标签名称"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="hideTagItem">取 消</el-button>
          <el-button type="primary" @click="editTagName" v-if="tagNameType">修 改</el-button>
          <el-button type="primary" @click="postTagName" v-else>保 存</el-button>
        </span>
      </template>

    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useTagList } from './hooks/list'
export default defineComponent({
  name: 'tag-list',

  setup () {
    const {
      tagListRef,
      searchRef,
      tableLoading,
      tagDialog,
      tagNameType,
      tagNameValue,
      newTagLoading,
      changeTagName,
      showTagItem,
      hideTagItem,
      postTagName,
      editTagName,
      handleEdit,
      handleDelete
    } = useTagList()
    return {
      tagListRef,
      searchRef,
      tableLoading,
      tagDialog,
      tagNameType,
      tagNameValue,
      newTagLoading,
      changeTagName,
      showTagItem,
      hideTagItem,
      postTagName,
      editTagName,
      handleEdit,
      handleDelete
    }
  }
})
</script>

<style lang="scss" scoped>
.view-container {
  --pagination-height: 0px;
}
</style>
