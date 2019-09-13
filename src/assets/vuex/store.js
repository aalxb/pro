import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import user from './user';
import todo from './todo';

export default new Vuex.Store({
	modules: {
		user,
		todo
	}
})
