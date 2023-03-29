import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Loading, QSpinnerBars } from 'quasar';

const api = axios.create({
  baseURL: 'https://api.codeui.link', timeout: 9000,
  onDownloadProgress: (progressEvent) => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);

    Loading.show({
      spinner: QSpinnerBars,
      spinnerColor: "accent",
      message: `${loaded} bytes of ${total} bytes. ${percent}%`,
    });
    setTimeout(() => Loading.hide(), 900)
  }
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { axios, api }
