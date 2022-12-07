/* eslint-disable import/no-anonymous-default-export */

// import { useState, useEffect } from 'react';
import axios from 'axios';

// import { urls } from '../utils/apiConfigs';
import { graphConfig } from '../utils/authConfig';

export default {
  getMSGraphPhoto: async function (accessToken) {
    try {
      const headers = new Headers();
      const bearer = `Bearer ${accessToken}`;

      headers.append('Authorization', bearer);

      const options = {
        method: 'GET',
        headers: headers,
      };

      return fetch(graphConfig.graphProfilePhotoEndpoint, options)
        .then((response) => response.blob())
        .catch((error) => console.log(error));
    } catch (error) {
      throw error;
    }
  },
  getMSProfile: async function (accessToken) {
    try {
      const bearer = `Bearer ${accessToken}`;

      const response = await axios.get(graphConfig.graphMeEndpoint, {
        headers: { Authorization: bearer },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
