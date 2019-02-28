import Vue from 'vue';
import Vuex from 'vuex';
import { getAdminInfo } from '../service/getData';

Vue.use(Vuex);

const state = {
    adminInfo: {
        avatar: 'default.jpg'
    }
};

const mutations = {
    saveAdminData(state, adminInfo) {
        state.adminInfo = adminInfo;
    }
};

const actions = {
    async getAdminData({commit}) {
        try {
            const res = await getAdminInfo();
            if (res.status == 1) {
                commit('saveAdminInfo', res.data);
            } else {
                throw new Error(res.type);
            }
        } catch(e) {
            console.log(e.message);
        }
    }
};

export default new Vuex.Store({
    state,
    actions,
    mutations
})