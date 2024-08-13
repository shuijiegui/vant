import instance from '@/utils/request'

export const getArticle = params => instance.get('/interview/query', {
  params
})
export const getArticleDetail = id => instance.get('/interview/show', {
  params: {
    id: id
  }
})

export const updateLike = (id) => {
  return instance.post('interview/opt', {
    id,
    optType: 1 // 喜欢
  })
}

export const updateCollect = (id) => {
  return instance.post('interview/opt', {
    id,
    optType: 2 // 收藏
  })
}
// 获取我的收藏
export const getArticlesCollect = (obj) => {
  return instance.get('/interview/opt/list', {
    params: {
      page: obj.page, // 当前页
      pageSize: 5, // 可选
      optType: 2 // 表示收藏
    }
  })
}

// 获取我的喜欢
export const getArticlesLike = (obj) => {
  return instance.get('/interview/opt/list', {
    params: {
      page: obj.page, // 当前页
      pageSize: 5, // 可选
      optType: 1 // 表示收藏
    }
  })
}
