import { axiosClient } from '@/Axios';

export default class StableDiffusionService {
  constructor() {}

  async txt2img(payload) {
    try {
      const { data } = await axiosClient.post('/sdapi/v1/txt2img', payload);
      return data;
    } catch (error) {
      console.log('Error in StableDiffusionService txt2img');
    }
  }

  async progress() {
    try {
      const { data } = await axiosClient.get('/sdapi/v1/progress');
      return data;
    } catch (error) {
      console.log('Error in StableDiffusionService progress');
    }
  }
}
