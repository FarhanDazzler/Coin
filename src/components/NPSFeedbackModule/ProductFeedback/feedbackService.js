/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

import { getUrl } from './apiConfigs';

export default {
  submitProductFeedback: async function (env, token, apiKey, data) {
    try {
      const response = await axios.post(getUrl(env, 'submitProductFeedbackURL'), data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-api-key': apiKey,
        },
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  checkProductFeedbackAllowed: async function (env, token, apiKey, data) {
    try {
      const response = await axios.get(getUrl(env, 'checkProductFeedbackAllowedURL'), {
        params: { product_id: data },
        headers: {
          Authorization: `Bearer ${token}`,
          'x-api-key': apiKey,
        },
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
};
