import axios from "axios"
import { Creative } from "type"

const serverUrl = "http://localhost:3001"

// Gets a specific creative (from id)
export const getCreativeDetail = async (id: string): Promise<Creative> => {
    const res = await axios.get(`${serverUrl}/creatives/${id}`)
    return res.data
}

// Gets all creatives
export const getCreatives = async (): Promise<Creative[]> => {
    const res = await axios.get(`${serverUrl}/creatives`)
    return res.data
}

// Gets an amount of creatives to shows for pagination
export const getPaginatedCreatives = async (page: number, limit: number): Promise<Creative[]> => {
  const res = await axios.get(`${serverUrl}/creatives?_page=${page}&_limit=${limit}`)
  return res.data
}

// Updates a specific creative (from id)
export const updateCreative = async (id: string, updatedData: Creative): Promise<number> => {
  const res = await axios.put(`${serverUrl}/creatives/${id}`, updatedData)
  return res.status
}

// Deletes a specific creative (from id)
export const deleteCreative = async (id: string): Promise<number> => {
  const res = await axios.delete(`${serverUrl}/creatives/${id}`)
  return res.status
}