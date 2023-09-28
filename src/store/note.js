import { defineStore } from 'pinia'
import {
  ServeGetNoteDetail,
  ServeGetNoteClass,
  ServeGetNoteTag,
  ServeGetNoteList,
  ServeEditNoteClass,
  ServeEditNoteTag,
  ServeDeleteNoteClass,
  ServeDeleteNoteTag,
} from '@/api/note'

export const useNoteStore = defineStore('note', {
  state: () => {
    return {
      tags: [],
      class: [],

      notes: {
        loadStatus: 0,
        params: { page: 1, keyword: '', find_type: 1, cid: 0 },
        items: [],
      },

      view: {
        editorMode: 'preview',
        loadId: 0,
        loadStatus: 0,
        detail: {
          id: '',
          class_id: '',
          title: '',
          is_asterisk: 0,
          status: 1,
          tags: [],
          files: [],
          content: '',
          md_content: '',
          created_at: '',
          class_name: '',
        },
      },
    }
  },

  actions: {
    close() {
      this.view.loadId = 0
    },

    addNewNote(class_id = '') {
      this.view.detail = {
        class_id: class_id,
        content: '',
        created_at: '',
        files: [],
        id: '',
        is_asterisk: 0,
        md_content: '',
        status: 1,
        tags: [],
        title: '无标题笔记',
      }

      this.view.loadId = 1
      this.view.loadStatus = 1

      this.setEditorMode('edit')

      this.loadClass()
    },

    loadClass() {
      ServeGetNoteClass().then(({ code, data }) => {
        if (code != 200) return false

        this.class = data.items
      })
    },

    loadTags() {
      ServeGetNoteTag().then(({ code, data }) => {
        if (code != 200) return false

        this.tags = data.tags
      })
    },

    loadNoteList(params = {}, isReset = true) {
      if (isReset) {
        Object.assign(
          this.notes.params,
          { page: 1, keyword: '', find_type: 1, cid: 0 },
          params
        )
      } else {
        Object.assign(this.notes.params, params)
      }

      this.notes.loadStatus = 0
      this.notes.items = []
      ServeGetNoteList(this.notes.params).then(res => {

        this.notes.items = res.data.items

        this.notes.loadStatus = 1
      })
    },

    updateNoteItem(id, params = {}) {
      const item = this.notes.items.find(item => item.id == id)

      item && Object.assign(item, params)
    },

    // 加载详情信息
    loadDetail(id) {
      this.view.loadId = id
      this.view.loadStatus = 0

      this.setEditorMode('preview')

      ServeGetNoteDetail({
        note_id: id,
      }).then(({ code, data }) => {
        if (code != 200 && data.id != this.view.loadId) {
          return
        }

        this.view.loadStatus = 1

        data.class_name = ''
        this.view.detail = data

        let node = this.class.find(item => {
          return item.id == data.class_id
        })

        this.view.detail.class_name = node.class_name || ''
      })
    },

    // 修改编辑模式
    setEditorMode(value) {
      this.view.editorMode = value
    },

    // 修改收藏状态
    setCollectionStatus(isTrue) {
      this.view.detail.is_asterisk = isTrue ? 1 : 0
    },

    // 编辑分类
    async editClass(class_id, class_name) {
      const res = await ServeEditNoteClass({ class_id, class_name })

      if (res && res.code === 200) {
        if (class_id === '') {
          this.class.unshift({ class_name, count: 0, id: res.data.id })
        } else {
          const item = this.class.find(item => item.id === class_id)
          item && Object.assign(item, { class_name })
        }
      }
    },

    async deleteClass(class_id) {
      const res = await ServeDeleteNoteClass({ class_id })

      if (res && res.code == 200) {
        const index = this.class.findIndex(item => item.id === class_id)

        if (index >= 0) {
          this.class.splice(index, 1)
        }
      } else {
        window['$message'].info(res.message)
      }
    },

    // 编辑标签
    async editTag(tag_id, tag_name) {
      const res = await ServeEditNoteTag({ tag_id, tag_name })

      if (res && res.code === 200) {
        if (tag_id == '') {
          this.tags.unshift({ tag_name, count: 0, id: res.data.id })
        } else {
          const item = this.tags.find(item => item.id === tag_id)
          item && Object.assign(item, { tag_name })
        }
      }
    },

    async deleteTag(tag_id) {
      const res = await ServeDeleteNoteTag({ tag_id })

      if (res && res.code == 200) {
        const index = this.tags.findIndex(item => item.id === tag_id)

        if (index >= 0) {
          this.tags.splice(index, 1)
        }
      } else {
        window['$message'].info(res.message)
      }
    },
  },
})
