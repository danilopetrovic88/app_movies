import api from './apiService'

const endpoints = {
    register: '/register',
    login: '/login',
    getUser: '/me',
    logout: '/logout'

}

export const registerUser = async (userData) => {
    const {data} = await api.post(endpoints.register,userData)
    return data
};
export const loginUser = async (userData) =>  await api.post(endpoints.login,userData);

export const getUser = async (userData) => {
    const {data} = await api.get(endpoints.getUser,userData);
    return data
}
export const logoutUser = async () => await api.post(endpoints.logout);