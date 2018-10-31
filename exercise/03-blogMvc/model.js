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

M.get = function (id) {
  return posts[id]
}

M.list = function () {
  return posts
}
