const root = document.querySelector('#root')
const userContainer = document.createElement('ul')
root.append(userContainer)

let currentUserId = Number(localStorage.getItem('userId')) || 1

const showUserAndPosts = (userName, userEmail, posts) => {
  userContainer.innerHTML = ''
  const user = document.createElement('li')
  const name = document.createElement('h1')
  name.innerText = userName
  const email = document.createElement('h2')
  email.innerText = userEmail
  user.append(name, email)
  userContainer.append(user)

  posts.forEach((product) => {
    const post = document.createElement('li')
    const title = document.createElement('h4')
    title.innerText = product.title
    const body = document.createElement('p')
    body.innerText = product.body
    post.append(title, body)
    userContainer.append(post)
  })

  root.append(userContainer)
}

const getUserAndPosts = async (userId) => {
  try {
    const [userResponse, postResponse] = await Promise.all([
      fetch(`https://dummyjson.com/users/${userId}`),
      fetch(`https://dummyjson.com/posts/user/${userId}`),
    ])
    if (!userResponse.ok) {
      throw Error('User not found')
    }

    if (!postResponse.ok) {
      console.log('no posts found for user')
    }
    const { firstName, email } = await userResponse.json()
    const { posts } = await postResponse.json()

    const nextUserButton = document.getElementById('next-user-button')
    nextUserButton.disabled = false
    showUserAndPosts(firstName, email, posts)
  } catch (error) {
    userContainer.innerHTML = `<h1>${error.message}</h1>`
    const nextUserButton = document.getElementById('next-user-button')
    if (nextUserButton) nextUserButton.disabled = true
  }
}
getUserAndPosts(currentUserId)

const getNextUser = async () => {
  currentUserId += 1
  await getUserAndPosts(currentUserId)
  localStorage.setItem('userId', currentUserId)
}

const getPreviousUser = async () => {
  if (currentUserId > 0) {
    currentUserId -= 1
    await getUserAndPosts(currentUserId)
    localStorage.setItem('userId', currentUserId)
  }
}

const appendNextUserButton = () => {
  const button = document.createElement('button')
  button.textContent = 'Next User'
  button.id = 'next-user-button'
  button.addEventListener('click', getNextUser)
  root.appendChild(button)
}

const appendPreviousUserButton = () => {
  const button = document.createElement('button')
  button.textContent = 'Previous User'
  button.addEventListener('click', getPreviousUser)
  root.appendChild(button)
}

appendPreviousUserButton()
appendNextUserButton()