import axiosSecure from "."

export const addHouse = async houseInfo => {
    const { data } = await axiosSecure.post(`/house`, houseInfo)
    return data;
}

// agent houses
export const agentHouses = async email => {
    const { data } = await axiosSecure(`/agentHouses/${email}`)
    return data;
}
export const getRole = async email => {
    const { data } = await axiosSecure(`/user/${email}`)
    return data;
}
