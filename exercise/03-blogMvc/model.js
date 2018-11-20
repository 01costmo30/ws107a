const M = module.exports = {}

const posts = []

M.add = function (post) {
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
}

M.edit = function (post) {
  posts[post.id] = post
  // post.created_at = new Date()
}
M.delete = function (id) {
  posts.splice(id, 1, {title: null, body: null, created_at: null, id: null})
  console.log(posts)
}
M.get = function (id) {
  return posts[id]
}

M.list = function () {
  return posts
}
