import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Loading, QSpinnerBars } from 'quasar';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', timeout: 9000,
  onDownloadProgress: async (progressEvent) => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);


    Loading.show({
      spinner: QSpinnerBars,
      spinnerColor: "accent",
      message: `${loaded} bytes of ${total} bytes. ${percent}%`,
    });
    await setTimeout(() => Loading.hide(), 1200)
  }
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { axios, api }
