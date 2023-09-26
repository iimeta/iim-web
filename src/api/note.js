import { post, get, upload } from '@/utils/request'
import { getAccessToken } from '@/utils/auth'

// -------- 笔记相关 --------

// 查询用户文集分类服务接口
export const ServeGetNoteList = data => {
  return get('/api/v1/note/list', data)
}

// 编辑笔记服务接口
export const ServeEditNote = data => {
  return post('/api/v1/note/editor', data)
}

// 删除笔记服务接口
export const ServeDeleteNote = data => {
  return post('/api/v1/note/delete', data)
}

// 永久删除笔记回收站的笔记
export const ServeForeverDeleteNote = data => {
  return post('/api/v1/note/forever/delete', data)
}

// 恢复笔记服务接口
export const ServeRecoverNote = data => {
  return post('/api/v1/note/recover', data)
}

// 设置标记星号笔记服务接口
export const ServeSetAsteriskNote = data => {
  return post('/api/v1/note/asterisk', data)
}

// 查询用户文集分类服务接口
export const ServeGetNoteDetail = data => {
  return get('/api/v1/note/detail', data)
}

// 移动笔记服务接口
export const ServeMoveNote = data => {
  return post('/api/v1/note/move', data)
}

// 笔记图片上传服务接口
export const ServeUploadNoteImg = data => {
  return upload('/api/v1/note/upload/image', data)
}

// 更新笔记标签服务接口
export const ServeUpdateNoteTag = data => {
  return post('/api/v1/note/tag', data)
}

// -------- 笔记分类相关 --------

// 查询用户文集分类服务接口
export const ServeGetNoteClass = data => {
  return get('/api/v1/note/class/list', data)
}

// 添加或编辑文集分类服务接口
export const ServeEditNoteClass = data => {
  return post('/api/v1/note/class/editor', data)
}

// 删除笔记分类服务接口
export const ServeDeleteNoteClass = data => {
  return post('/api/v1/note/class/delete', data)
}

// 笔记分类排序服务接口
export const ServeNoteClassSort = data => {
  return post('/api/v1/note/class/sort', data)
}

// 合并笔记分类服务接口
export const ServeMergeNoteClass = data => {
  return post('/api/v1/note/merge', data)
}

// -------- 笔记标签相关 --------

// 获取笔记表标签服务接口
export const ServeGetNoteTag = data => {
  return get('/api/v1/note/tag/list', data)
}

// 添加或编辑笔记标签服务接口
export const ServeEditNoteTag = data => {
  return post('/api/v1/note/tag/editor', data)
}

// 删除笔记标签服务接口
export const ServeDeleteNoteTag = data => {
  return post('/api/v1/note/tag/delete', data)
}

// -------- 笔记附件相关 --------

// 笔记附件上传服务接口
export const ServeUploadNoteAnnex = data => {
  return upload('/api/v1/note/annex/upload', data)
}

// 移除笔记附件服务接口
export const ServeDeleteNoteAnnex = data => {
  return post('/api/v1/note/annex/delete', data)
}

// 永久删除笔记附件回收站文件
export const ServeForeverDeleteAnnex = data => {
  return post('/api/v1/note/annex/forever/delete', data)
}

// 恢复笔记附件服务接口
export const ServeRecoverNoteAnnex = data => {
  return post('/api/v1/note/annex/recover', data)
}

// 笔记附件回收站列表服务接口
export const ServeGetRecoverAnnexList = () => {
  return get('/api/v1/note/annex/recover/list')
}

// 下载笔记附件服务接口
export const ServeDownloadAnnex = annex_id => {
  let api = import.meta.env.VITE_BASE_API
  try {
    let link = document.createElement('a')
    // link.target = '_blank'
    link.href = `${api}/api/v1/note/annex/download?annex_id=${annex_id}&token=${getAccessToken()}`
    link.click()
  } catch (e) {
    console.error(e)
  }
}
