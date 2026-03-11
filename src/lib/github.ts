import axios from "axios"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const axiosConfig = GITHUB_TOKEN ? {
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json"
  }
} : {};

export async function getUser(username: string) {
  try {
    const res = await axios.get(`https://api.github.com/users/${username}`, axiosConfig)
    return res.data
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return { error: 'User not found', status: 404 }
    }
    if (error.response && error.response.status === 403) {
      return { error: 'API rate limit exceeded or forbidden', status: 403 }
    }
    return { error: error.message || 'Unknown error', status: error.response?.status || 500 }
  }
}

export async function getRepos(username: string) {
  try {
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      axiosConfig
    )
    return res.data
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      return { error: 'API rate limit exceeded or forbidden', status: 403 }
    }
    return { error: error.message || 'Unknown error', status: error.response?.status || 500 }
  }
}